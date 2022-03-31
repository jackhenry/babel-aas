import asyncio
from collections import OrderedDict
from datetime import datetime
import json
from queue import Queue
from typing import List, Union
from starlette.types import ASGIApp, Receive, Scope, Send

ClientHistory = Queue[datetime]
Cache = OrderedDict[str, ClientHistory]


class ClientCache:
    def __init__(self, capacity: int) -> None:
        self.cache: Cache = OrderedDict()
        self.capacity = capacity

    def get(self, client: str) -> Union[ClientHistory, None]:
        if client not in self.cache:
            return None
        else:
            self.cache.move_to_end(client)
            return self.cache[client]

    def put(self, client: str):
        existing = self.get(client)
        if existing is None:
            self.cache[client] = Queue()
        self.cache[client].put(datetime.now())
        self.cache.move_to_end(client)
        self.ensure_size()

    def ensure_size(self):
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)


class RateLimitMiddleware:
    def __init__(
        self,
        app: ASGIApp,
        max_requests=3,
        interval_ms=1000,
        cache_size=1000
    ) -> None:
        self.app = app
        self.max_requests = max_requests
        self.interval_ms = interval_ms
        self.cache = ClientCache(cache_size)
        self.loop = asyncio.get_event_loop()
        self.register_cache_manager()

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if self.should_block(scope):
            return await self._on_blocked()(scope, receive, send)

        client = scope.get('client')[0]
        # Add client request to cache
        self.cache.put(client)
        await self.app(scope, receive, send)
        return

    def _on_blocked(self):
        async def default_429(scope: Scope, receive: Receive, send: Send) -> None:
            body = json.dumps({
                "results": {
                    "status": "429",
                    "filepath": "N/A",
                    "message": "Rate Limit Exceeded. Please slow down."
                }
            })
            await send(
                {
                    "type": "http.response.start",
                    "status": 429,
                    "headers": [
                        (b"retry-after", str(1000).encode("ascii")),
                    ],
                }
            )
            await send({"type": "http.response.body", "body": bytes(body, 'utf-8'), "more_body": False})

        return default_429

    def register_cache_manager(self) -> None:
        asyncio.run_coroutine_threadsafe(self.manage_cache(), self.loop)

    async def manage_cache(self) -> None:
        while True:
            for [_, history] in self.cache.cache.items():
                filtered = self._filter_unexpired_requests(history.queue)
                history.queue.clear()
                history.queue.extend(filtered)
            # Sleep for interval before checking again
            await asyncio.sleep(self.interval_ms / 1000)

    def should_block(self, scope: Scope) -> bool:
        client: str = scope.get('client')[0]
        # If the client can't be retrieved from scope, allow the request
        if client is None:
            return False
        now = datetime.now()
        client_history = self.cache.get(client)
        if client_history is None:
            return False

        # Dont' block if client hasn't made enough requests to be eligible for blocking
        if client_history.qsize() < self.max_requests:
            return False

        history_queue: List[datetime] = client_history.queue

        filtered = self._filter_expired_requests(history_queue)
        return len(filtered) >= self.max_requests

    def _filter_unexpired_requests(self, queue: List[datetime]) -> list[datetime]:
        now = datetime.now()
        filtered = filter(
            lambda then: (now - then).total_seconds() /
            1000 > self.interval_ms,
            queue
        )
        return list(filtered)

    def _filter_expired_requests(self, queue: List[datetime]) -> list[datetime]:
        now = datetime.now()
        filtered = filter(
            lambda then: (now - then).total_seconds() /
            1000 <= self.interval_ms,
            queue
        )
        return list(filtered)

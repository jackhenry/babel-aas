from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.middleware.ratelimit import RateLimitMiddleware

from server.routers import babel_router


def init_routers(server: FastAPI):
    server.include_router(babel_router)


def init_middleware(server: FastAPI):
    server.add_middleware(RateLimitMiddleware)


def init_cors(server: FastAPI):
    origins = [
        "*",
    ]
    server.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"]
    )


def create_server() -> FastAPI:
    server = FastAPI(
        title="gateway",
        description="babel-aas gateway API",
        version="0.0.0"
    )
    init_middleware(server)
    init_cors(server)
    init_routers(server)
    return server


server = create_server()

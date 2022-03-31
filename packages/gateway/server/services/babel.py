import asyncio
import requests
import os
from fastapi import HTTPException
from server.schemas import CompileResult, CompileRequest


class BabelService(object):
    @staticmethod
    async def compile(request: CompileRequest):
        json = request.dict()
        url = os.environ.get('BAAS_SERVICE_URL')
        loop = asyncio.get_event_loop()
        httpRequestFuture = loop.run_in_executor(
            None, lambda: requests.post(url, json=json))
        try:
            response = await httpRequestFuture
            json = response.json()
            return CompileResult(results=json)
        except:
            raise HTTPException(
                status_code=500, detail="Unable to establish connection with babel node")

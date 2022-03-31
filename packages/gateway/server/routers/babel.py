from fastapi import APIRouter
from server.services.babel import BabelService

from server.schemas import CompileRequest, CompileResult, ExceptionResponseSchema

babel_router = APIRouter()


@babel_router.post("/",
                   response_model=CompileResult,
                   responses={"400": {"model": ExceptionResponseSchema}}
                   )
async def babel(request: CompileRequest):
    return await BabelService.compile(request)


@babel_router.get("/")
async def status():
    return {"status": "OK"}

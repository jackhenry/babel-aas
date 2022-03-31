from typing import Dict, List, TypeVar
from pydantic import BaseModel

BabelPreset = str
BabelPlugin = str
FilePath = str
FileSource = str
CompiledFileSource = str


class CompileResult(BaseModel):
    results: Dict[FilePath, CompiledFileSource]


class CompileRequest(BaseModel):
    sources: Dict[FilePath, FileSource]
    presets: List[BabelPreset]
    plugins: List[BabelPlugin]

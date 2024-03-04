from fastapi import APIRouter
from typing import Dict
import common.sharedModels as sharedModels
extra_router = APIRouter()

@extra_router.post("/update-shared-files")
async def update_shared_files(file_names:Dict[str,str]):
    res = await sharedModels.retrive_shared_models(file_names)
    return res
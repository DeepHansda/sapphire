from fastapi import APIRouter,Path,Response,status
from typing import Dict,Annotated
import common.sharedModels as sharedModels
from controllers.ModelsControllers import ModelsController
from common.Utils import Utils


commonUtils = Utils()

modelsController = ModelsController()
extra_router = APIRouter()


@extra_router.post("/update-shared-files")
@commonUtils.exception_handler
async def update_shared_files(file_names:Dict[str,str]):
    res = await sharedModels.retrive_shared_models(file_names)
    return Response(status_code=status.HTTP_200_OK,content=res)


@extra_router.get("/get-models/{model_type}")
async def get_models(model_type:Annotated[str,Path(title="to get the models")]):
    print(model_type)
    res = await modelsController.get_models(model_type)
    return res

@extra_router.get("/get-all-models")
async def get_all_models():
    res = await modelsController.get_all_models()
    return res

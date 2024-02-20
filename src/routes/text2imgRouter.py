from fastapi import APIRouter, Response
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

t2ImgControllers = Text2ImgControllers()
router = APIRouter(on_startup=[t2ImgControllers.setup])



@router.post("/ttimg")
async def ttimg(prompt:Text2Image_Type) -> Response:
        return await t2ImgControllers.text2img(prompt)
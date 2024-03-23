from fastapi import APIRouter, Response,Depends
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

t2ImgControllers = Text2ImgControllers()
router = APIRouter()



@router.post("/text-to-img")
async def text_to_img(prompt:Text2Image_Type = Depends()):
        print(prompt)
        res = await t2ImgControllers.text2img(prompt)
        return res
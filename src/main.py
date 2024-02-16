from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.requests import Request
from controllers.T2ImgControllers import T2ImgControllers
from types.Types import Text2Image_Type


app = FastAPI()

t2ImgControllers = T2ImgControllers()


   
  
   
@app.get('/')
async def root():
   return await mainControllers.root()

@app.post("/ttimg")
async def ttimg(prompt:Text2Image_Type) -> Response:
    return await t2ImgControllers.root(prompt)
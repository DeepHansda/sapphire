from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.requests import Request
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

t2ImgControllers = Text2ImgControllers()
@asynccontextmanager
async def lifespan(app:FastAPI):
   
   t2ImgControllers.setup()
   yield
   print("stopping")
   
   



app = FastAPI(lifespan = lifespan)




   
  
   
@app.get('/')
async def root():
   return await mainControllers.root()

@app.post("/ttimg")
async def ttimg(prompt:Text2Image_Type) -> Response:
    return await t2ImgControllers.text2img(prompt)
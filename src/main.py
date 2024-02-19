from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.requests import Request
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

from routes.text2imgRouter import text2imgRouter

t2ImgControllers = Text2ImgControllers()
@asynccontextmanager
async def lifespan(app:FastAPI):
   
   t2ImgControllers.setup()
   yield
   print("stopping")
   
   



app = FastAPI(lifespan = lifespan)

app.include_router(text2imgRouter)



   
  
   
@app.get('/')
async def root():
   return await mainControllers.root()

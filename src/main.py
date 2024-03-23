from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.requests import Request
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

import routes.text2imgRouter as text2imgRouter
import routes.extraRouter as extraRouter
import routes.img2imgRouter as img2imgRouter
import common.Folder_Paths as Folder_Paths
from common.startup import startUp

# t2ImgControllers = Text2ImgControllers()
folder_path = Folder_Paths.Folder_paths()

@asynccontextmanager
async def lifespan(app:FastAPI):
   await startUp()
   yield
   print("stopping")

app = FastAPI(lifespan=lifespan)
app.include_router(extraRouter.extra_router)
app.include_router(text2imgRouter.router)
app.include_router(img2imgRouter.img2imgRouter)




   
  
   
@app.get('/')
async def root():
   return "<h1>server working!</h1>"

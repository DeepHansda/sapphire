from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.requests import Request
from controllers.Text2ImgControllers import Text2ImgControllers
from common.Types import Text2Image_Type
from contextlib import asynccontextmanager

import routes.text2imgRouter as text2imgRouter
import common.Folder_Paths as Folder_Paths
from common.Folder_Paths import add_folders_in_models_folder

# t2ImgControllers = Text2ImgControllers()
# @asynccontextmanager
# async def lifespan(app:FastAPI):
   
#    t2ImgControllers.setup()
#    yield
#    print("stopping")
   
   



app = FastAPI()
app.include_router(text2imgRouter.router)
folder_path = Folder_Paths.Folder_paths()
add_folders_in_models_folder()



   
  
   
@app.get('/')
async def root():
   return "<h1>server working!</h1>"

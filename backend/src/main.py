import asyncio
from contextlib import asynccontextmanager
import uvicorn
import common.Folder_Paths as Folder_Paths
import logging, os, time
from common.startup import startUp
from fastapi.middleware.cors import CORSMiddleware
from watchfiles import run_process
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
from common.PipelineComponents import PipelineComponents
from common.Utils import FileChangeHandler

from routes.extraRouter import extra_router
from routes.text2imgRouter import text2ImgRouter
from routes.img2imgRouter import img2imgRouter
from routes.imagesRoutes import images_routes

# t2ImgControllers = Text2ImgControllers()
folder_path = Folder_Paths.Folder_paths()
# commonUtils = Utils()
pipeline_components = PipelineComponents()
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

main_shared_file_path = os.path.join(Folder_Paths.cwd, "shared_values.json")


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#    functions_to_call = [pipeline_components.pipeline_setup()]
#    # Start watching for file changes asynchronously
#    # file_path = "/kaggle/working/sapphire/src/shared_values.json"
#    event_handler = FileChangeHandler(functions_to_call, main_shared_file_path)
#    observer = Observer()
#    observer.schedule(event_handler, main_shared_file_path,recursive=True)
#    observer.start()

#    print("Setup Complete.")
#    yield
#    tasks = asyncio.all_tasks()
#    for tsk in tasks:
#        tsk.cancel()

#    # Wait for all tasks to be cancelled
#    await asyncio.gather(*tasks, return_exceptions=True)

#    # Close the event loop
#    asyncio.get_event_loop().close()
#    observer.stop()
#    observer.join()  # Wait for the observer to stop completely
#    print("Observer stopped.")

app = FastAPI()
main_app_lifespan = app.router.lifespan_context
def callback(changes):
    print("changes in :" ,changes)
def changesMade():
    print("changes made")
@asynccontextmanager
async def lifespan_wrapper(app):
    run_process("/kaggle/working/sapphire/backend/src/shared_values.json",target=changesMade,callback=callback)
    async with main_app_lifespan(app) as maybe_state:
        yield maybe_state
    print("sub shutdown")


app.router.lifespan_context = lifespan_wrapper

origins = ["*", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(extra_router)
app.include_router(text2ImgRouter)
app.include_router(img2imgRouter)
app.include_router(images_routes)


@app.get("/")
async def root():
    return "server working!"

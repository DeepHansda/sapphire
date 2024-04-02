import asyncio
from contextlib import asynccontextmanager
import uvicorn
import common.Folder_Paths as Folder_Paths
import logging,os,time
from common.startup import startUp

from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
from common.PipelineComponents import PipelineComponents
from common.Utils import FileChangeHandler
# t2ImgControllers = Text2ImgControllers()
folder_path = Folder_Paths.Folder_paths()
# commonUtils = Utils()
pipeline_components = PipelineComponents()
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

main_shared_file_path = os.path.join(Folder_Paths.cwd,"shared_values.json")

def startUp_event():
   try:
      loop = asyncio.get_running_loop()
   except RuntimeError:  # 'RuntimeError: There is no current event loop...'
      loop = None
   
   if loop and loop.is_running():
      task = asyncio.create_task(startUp())
      task.add_done_callback(
            lambda t: print(f'Task done with result={t.result()}  << return val of main()'))

   else:
      print('Starting new event loop')
      result = asyncio.run(startUp())
      print(result)
   print(task.done())






@asynccontextmanager
async def lifespan(app: FastAPI):
   functions_to_call = [pipeline_components.pipeline_setup()]
   # Start watching for file changes asynchronously
   # file_path = "/kaggle/working/sapphire/src/shared_values.json"
   event_handler = FileChangeHandler(functions_to_call, main_shared_file_path)
   observer = Observer()
   observer.schedule(event_handler, main_shared_file_path,recursive=True)
   observer.start()

   print("Setup Complete.")
   yield
   tasks = asyncio.all_tasks()
   for tsk in tasks:
       tsk.cancel()

   # Wait for all tasks to be cancelled
   await asyncio.gather(*tasks, return_exceptions=True)

   # Close the event loop
   asyncio.get_event_loop().close()
   observer.stop()
   observer.join()  # Wait for the observer to stop completely
   print("Observer stopped.")


app = FastAPI(lifespan=lifespan)


print("wosdfsfsdf")
import routes.extraRouter as extraRouter
import routes.img2imgRouter as img2imgRouter
import routes.text2imgRouter as text2imgRouter
from common.Types import Text2Image_Type
from controllers.Text2ImgControllers import Text2ImgControllers
app.include_router(extraRouter.extra_router)
app.include_router(text2imgRouter.router)
app.include_router(img2imgRouter.img2imgRouter)
@app.get("/")
async def root():
   return "<h1>server working!</h1>"



async def server():
   config = uvicorn.Config("__main__:app", port=8000, log_level="debug",workers=2)
   server = uvicorn.Server(config)
   server.run()
if __name__ == "__main__":
   startUp_event()
   asyncio.run(server())
   print("Starting server")

   # import routes.extraRouter as extraRouter
   # import routes.img2imgRouter as img2imgRouter
   # import routes.text2imgRouter as text2imgRouter
   # app.include_router(extraRouter.extra_router)
   # app.include_router(text2imgRouter.router)
   # app.include_router(img2imgRouter.img2imgRouter)
   # @app.get("/")
   # async def root():
   #    return "<h1>server working!</h1>"
   
   # # uvicorn.run(app="__main__:app", host = '::', port=8000, reload=True,
   # #              workers=2)
from fastapi import FastAPI
from controllers.MainControllers import MainControllers
app = FastAPI()

mainControllers = MainControllers()

@app.get('/')
async def root():
    await mainControllers.root()
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import Response
from fastapi.requests import Request
from controllers.MainControllers import MainControllers
from diffusers import AutoPipelineForText2Image
import torch,io
from PIL import Image


app = FastAPI()

mainControllers = MainControllers()

class Prompt(BaseModel):
   prompt:str
   

async def generate_img(prompt:str) -> Image:
   pipeline = AutoPipelineForText2Image.from_pretrained(
      "runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16, use_safetensors=True
   ).to("cuda")

   image = pipeline(prompt, num_inference_steps=25).images[0]
   print(type(image))

   return image
   
@app.get('/')
async def root():
   return await mainControllers.root()

@app.post("/ttimg")
async def ttimg(prompt:Prompt) -> Response:
   prompt = prompt.prompt
   print(prompt)
   img:bytes = await generate_img(prompt)
   return Response(content=(io.BytesIO(img)),media_type="image/jpeg")
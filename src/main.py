from fastapi import FastAPI
from fastapi.responses import FileResponse
from controllers.MainControllers import MainControllers
from diffusers import AutoPipelineForText2Image
import torch
app = FastAPI()

mainControllers = MainControllers()

async def generate_img(prompt):
   pipeline = AutoPipelineForText2Image.from_pretrained(
      "runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16, use_safetensors=True
   ).to("cuda")

   image = await pipeline(prompt, num_inference_steps=25).images[0]
   return image
   
@app.get('/')
async def root():
   return await mainControllers.root()

@app.post("/ttimg")
async def ttimg(request):
   prompt = request.post.prompt
   img = await generate_img(prompt)
   return FileResponse(img,media_type="image/*")
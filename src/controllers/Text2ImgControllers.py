from fastapi.responses import Response
from diffusers import AutoPipelineForText2Image


import torch,io
from PIL import Image
from common.Types import Text2Image_Type
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline



class Text2ImgControllers:
        
    def setup(self):
        def __init__(self):
            pass
        
        model_path ="runwayml/stable-diffusion-v1-5"
        pipeline:StableDiffusionPipeline = AutoPipelineForText2Image.from_pretrained(
                model_path, torch_dtype=torch.float16,  use_safetensors=True,safety_checker=None
        ).to("cuda")
      
        print(type(pipeline))
        self.pipeline:StableDiffusionPipeline = pipeline
        
        
        
    async def text2img(self,req:Text2Image_Type) -> Response: 
        prompt = req.prompt
        image:Image.Image = self.pipeline(prompt=prompt , num_inference_steps=25).images[0]
         
        buf = io.BytesIO()
        image.save(buf, format="PNG")
         
        byte_img = buf.getvalue()
         
        return Response(content=byte_img,media_type="image/png")
        
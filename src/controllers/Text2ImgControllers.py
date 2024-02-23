from fastapi.responses import Response
from diffusers import AutoPipelineForText2Image



import torch,io
from PIL import Image
from common.Types import Text2Image_Type
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline
from common.Utils import Utils



class Text2ImgControllers:
    # global diff_utils 
    # diff_utils = Utils()
    def __init__(self):
        self.diff_utils = Utils()
        pass
    
    def setup(self):
               
            
        
        model_path ="runwayml/stable-diffusion-v1-5"
        pipeline:StableDiffusionPipeline = AutoPipelineForText2Image.from_pretrained(
                model_path, torch_dtype=torch.float16,  use_safetensors=True,safety_checker=None
        ).to("cuda")
      
        print(type(pipeline))
        self.pipeline:StableDiffusionPipeline = pipeline
        
        
        
    async def text2img(self,req:Text2Image_Type) -> Response: 
        prompt = req.prompt
        negative_prompt = req.negative_prompt
        scheduler = self.diff_utils.get_scheduler(self.pipeline,req.scheduler,req.use_kerras)
        
        
        image:Image.Image = self.pipeline(prompt=prompt , negative_prompt=negative_prompt, num_inference_steps=25).images[0]
        self.pipeline.scheduler = scheduler
        print(self.pipeline.scheduler)
         
        buf = io.BytesIO()
        image.save(buf, format="PNG")
         
        byte_img = buf.getvalue()
         
        return Response(content=byte_img,media_type="image/png")
        
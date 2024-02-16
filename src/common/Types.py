from pydantic import BaseModel
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline

class Text2Image_Type(BaseModel):
    prompt:str
    negative_prompt:str
    width:int | None
    height:int | None
    seed:int   | None
    guidance_scale: float| None
    
    
class Text_Emmbed_Type(BaseModel,StableDiffusionPipeline):
    prompt:str
    negative_prompt:str
    pipeline:StableDiffusionPipeline
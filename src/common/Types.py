from typing import Any
from pydantic import BaseModel
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline

class Text2Image_Type(BaseModel):
    prompt:str
    negative_prompt:str
    width:int | None
    height:int | None
    scheduler: str
    use_kerras:bool
    seed:int   | None
    guidance_scale: float| None
    
    
class Text_Emmbed_Type(BaseModel,StableDiffusionPipeline):
    prompt:str
    negative_prompt:str
    pipeline:Any
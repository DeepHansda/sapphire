from typing import Any
from pydantic import BaseModel
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline

class Text2Image_Type(BaseModel):
    prompt:str
    negative_prompt:str
    width:int | int = 512
    height:int | int = 512
    scheduler: str
    steps:int | int = 20
    use_kerras:bool
    seed:int   | None = None
    guidance_scale: float| float = 7.0
    use_lora:bool
    
    
class Text_Emmbed_Type(BaseModel,StableDiffusionPipeline):
    prompt:str
    negative_prompt:str
    pipeline:Any
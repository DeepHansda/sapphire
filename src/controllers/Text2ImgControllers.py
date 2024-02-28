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
        model_path ="/kaggle/working/sapphire/src/models/checkpoints/DreamShaper_8_pruned.safetensors"
        pipeline:StableDiffusionPipeline = StableDiffusionPipeline.from_single_file(
                model_path, torch_dtype=torch.float16,  use_safetensors=True,safety_checker=None
        ).to("cuda")
        # pipeline.enable_xformers_memory_efficient_attention()
        print(type(pipeline))

        self.pipeline:StableDiffusionPipeline = pipeline
        
        
        
    async def text2img(self,req:Text2Image_Type) -> Response: 
        prompt = req.prompt
        negative_prompt = req.negative_prompt
        scheduler = self.diff_utils.get_scheduler(self.pipeline,req.scheduler,req.use_kerras)
        lora_path = "/kaggle/working/sapphire/src/models/loras/Style_3D.Rendering.safetensors"
        
        print(req)
        
        
        image:Image.Image = self.pipeline(prompt=prompt , negative_prompt=negative_prompt, num_inference_steps=25).images[0]
        
        
        self.pipeline.scheduler = scheduler
        if req.use_lora is True:
            self.pipeline.load_lora_weights(lora_path,weight_name="Style_3D.Rendering.safetensors")
            self.pipeline.fuse_lora("0.7")
        print(self.pipeline.scheduler)
         
        buf = io.BytesIO()
        image.save(buf, format="PNG")
         
        byte_img = buf.getvalue()
         
        return Response(content=byte_img,media_type="image/png")
        
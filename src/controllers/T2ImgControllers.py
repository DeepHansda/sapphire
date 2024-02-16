from fastapi.responses import Response
from diffusers import AutoPipelineForText2Image
import torch,io
from PIL import Image
from types.Types import Text2Image_Type


class T2ImgControllers:
    async def root(self,req:Text2Image_Type) -> Response: 
        pipeline = AutoPipelineForText2Image.from_pretrained(
                "runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16,  use_safetensors=True
        ).to("cuda")

        prompt = req.prompt
        image:Image.Image = pipeline(prompt=prompt , num_inference_steps=25).images[0]
         
        buf = io.BytesIO()
        image.save(buf, format="PNG")
         
        byte_img = buf.getvalue()
         
        return Response(content=byte_img,media_type="image/png")
        
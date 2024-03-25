from diffusers import AutoPipelineForImage2Image
from common.PipelineComponents import PipelineComponents
from common.Types import Image2Image_Type,Text2Image_Type
from common.Utils import Utils
from common.Folder_Paths import cwd
from common.const import INPUT,OUTPUT
from PIL import Image
from fastapi.responses import Response
from io import BytesIO

import aiofiles

diff_utils = Utils()
class Img2ImgControllers:
    def __init__(self):
        self.pipeline_components = PipelineComponents()
        self.shared_component = self.pipeline_components.pipeline_setup()
        self.device = self.pipeline_components.device
        
    # @diff_utils.exception_handler
    async def img2img(self,req:Image2Image_Type):
        pipeline = AutoPipelineForImage2Image.from_pipe(self.shared_component)

        img_path = f"{cwd}/{INPUT}/{req.image.filename}"
        async with aiofiles.open(img_path,"wb") as input_img:
            await input_img.write(req.image.file.read())

        prompt = req.prompt
        negative_prompt = req.negative_prompt
        width = req.width
        height = req.height
        steps = req.steps
        guidance_scale = req.guidance_scale
        scheduler = self.pipeline_components.get_scheduler(
            req.scheduler, req.use_kerras
        )
        # self.pipeline.scheduler.use_kerras_sigmas = req.use_kerras
        seed, generator = diff_utils.seed_handler(req.seed)
        print(seed)

        pipeline.scheduler = scheduler

        in_image:Image.Image = Image.open((img_path),mode="r")
        in_image.tobytes("xbm", "rgb")
        print(in_image.size)
        image: Image.Image = pipeline(
            prompt=prompt,
            image = in_image,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            generator=generator,
            guidance_scale=guidance_scale,
            num_inference_steps=steps,
            strength = 0.65
        ).images[0]

        byte_img = diff_utils.get_byte_img(image)

        return Response(content=byte_img, media_type="image/png")
        
            
        

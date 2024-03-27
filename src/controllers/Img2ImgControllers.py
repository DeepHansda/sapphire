from io import BytesIO

import aiofiles
from common.const import INPUT, OUTPUT
from common.Folder_Paths import cwd
from common.PipelineComponents import PipelineComponents
from common.Types import Image2Image_Type, Text2Image_Type
from common.Utils import Utils
from diffusers import AutoPipelineForImage2Image
from diffusers.pipelines.stable_diffusion.pipeline_output import \
    StableDiffusionPipelineOutput
from fastapi.responses import Response
from PIL import Image

diff_utils = Utils()


class Img2ImgControllers:
    def __init__(self):
        self.pipeline_components = PipelineComponents()
        self.shared_component = self.pipeline_components.pipeline_setup()
        self.device = self.pipeline_components.device

    # @diff_utils.exception_handler
    async def img2img(self, req: Image2Image_Type):
        pipeline = AutoPipelineForImage2Image.from_pipe(self.shared_component)

        img_path = f"{cwd}/{INPUT}/{req.image.filename}"
        async with aiofiles.open(img_path, "wb") as input_img:
            await input_img.write(req.image.file.read())

        prompt = req.prompt
        negative_prompt = req.negative_prompt
        width = req.width
        height = req.height
        steps = req.steps
        guidance_scale = req.guidance_scale
        strength = req.strength
        scheduler = self.pipeline_components.get_scheduler(
            req.scheduler, req.use_kerras
        )
        # self.pipeline.scheduler.use_kerras_sigmas = req.use_kerras
        seed, generator = diff_utils.seed_handler(req.seed)
        print(seed)

        pipeline.scheduler = scheduler

        in_image: Image.Image = Image.open((img_path), mode="r")
        in_image = in_image.resize((width, height)).rotate(90)
        in_image.tobytes("xbm", "rgb")
        print(in_image.size)
        result: StableDiffusionPipelineOutput = pipeline(
            prompt=prompt,
            image=in_image,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            generator=generator,
            guidance_scale=guidance_scale,
            num_inference_steps=steps,
            strength=strength,
            num_images_per_prompt=req.batch_size,
            
        )

        byte_img = diff_utils.handle_generated_images(result.images)

        return Response(content=byte_img, media_type="image/png")

from io import BytesIO
from fastapi import status
import aiofiles
from common.const import INPUT, OUTPUT
from common.Folder_Paths import cwd
from common.PipelineComponents import PipelineComponents
from common.Types import Image2Image_Type, Text2Image_Type
from common.Utils import Utils
from diffusers import AutoPipelineForImage2Image
from diffusers.pipelines.stable_diffusion.pipeline_output import (
    StableDiffusionPipelineOutput,
)
from fastapi.responses import Response, StreamingResponse, JSONResponse
from PIL import Image, ImageOps
from common.const import IMG2IMG_TAG
import json

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
        batch_size = req.batch_size
        scheduler = self.pipeline_components.get_scheduler(
            req.scheduler, req.use_kerras
        )
        # self.pipeline.scheduler.use_kerras_sigmas = req.use_kerras
        seed, generator = diff_utils.seed_handler(req.seed)
        print(seed)

        pipeline.scheduler = scheduler
        img_size = (width, height)
        in_image: Image.Image = Image.open((img_path), mode="r")
        in_image = ImageOps.exif_transpose(in_image)
        # in_image = in_image.resize((width, height))
        in_image = ImageOps.fit(in_image, img_size)
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
            num_images_per_prompt=batch_size,
        )
        additional_data = {
            "tag": IMG2IMG_TAG,
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "width": width,
            "height": height,
            "seed": seed,
            "steps": steps,
            "scheduler": req.scheduler,
            "guidance_scale": guidance_scale,
            "num_inference_steps": steps,
            "batch_size": batch_size,
        }

        if req.want_enc_imgs:
            img_data_json = diff_utils.handle_generated_images(
                result.images,
                metaData=additional_data,
                base64_for_img=True,
                tag=IMG2IMG_TAG,
            )

            additional_data_json = json.dumps(additional_data)

            # Creating a JSON response with image bytes and additional data
            response_data = {
                "enc_img_data": img_data_json,  # Assuming byte_img is converted to base64 string
                "additional_data": additional_data_json,
            }

            return JSONResponse(content=response_data, status_code=status.HTTP_200_OK)
        img_data_json = diff_utils.handle_generated_images(
            result.images, metaData=None, base64_for_img=False, tag=IMG2IMG_TAG
        )
        return Response(content=img_data_json, media_type="image/png")

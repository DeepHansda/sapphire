from fastapi.responses import Response
from fastapi import HTTPException, status
from diffusers import AutoPipelineForText2Image, AutoencoderKL, StableDiffusionPipeline
from common.PipelineComponents import PipelineComponents

import torch
from PIL import Image
from common.Types import Text2Image_Type
import common.shared as sharedValues
import os
from common.Utils import Utils


class Text2ImgControllers:
    def __init__(self):
        self.component_pipeline = PipelineComponents()
        self.diff_utils = Utils()
        self.sharedValues = sharedValues.load_shared_values()
        self.device = self.component_pipeline.device
        

    async def text2img(self, req: Text2Image_Type):
        pipeline = AutoPipelineForText2Image.from_pipe(self.component_pipeline.get_component_pipeline())
        prompt = req.prompt
        negative_prompt = req.negative_prompt
        width = req.width
        height = req.height
        steps = req.steps
        guidance_scale = req.guidance_scale
        scheduler = self.diff_utils.get_scheduler(
            pipeline, req.scheduler, req.use_kerras
        )
        # self.pipeline.scheduler.use_kerras_sigmas = req.use_kerras

        print(scheduler)

        

        lora_path = (
            "/kaggle/working/sapphire/src/models/loras/ghibli_style_offset.safetensors"
        )

        if req.seed == -1:
            seed = self.diff_utils.random_seed(10)
        else:
            seed = req.seed

        print(seed)
        generator = torch.Generator(device=self.device).manual_seed(seed)
        pipeline.scheduler = scheduler

        # if req.use_lora is True:
        #     self.pipeline.load_lora_weights(
        #         lora_path, weight_name="ghibli_style_offset.safetensors"
        #     )
        #     self.pipeline.fuse_lora("1.0")
        # else:
        #     self.pipeline.unfuse_lora()
        #     self.pipeline.unload_lora_weights()
        # print(self.pipeline.scheduler)

        image: Image.Image = pipeline(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            generator=generator,
            guidance_scale=guidance_scale,
            num_inference_steps=steps,
        ).images[0]

        byte_img = self.diff_utils.get_byte_img(image)

        return Response(content=byte_img, media_type="image/png")

    # except Exception as e:
    #     print(e)
    #     return HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
    #     )

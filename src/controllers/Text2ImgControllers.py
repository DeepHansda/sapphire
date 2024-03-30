import base64
import json

import common.shared as sharedValues
from common.PipelineComponents import PipelineComponents
from common.Types import Text2Image_Type
from common.Utils import Utils
from diffusers import AutoPipelineForText2Image
from diffusers.pipelines.stable_diffusion.pipeline_output import \
    StableDiffusionPipelineOutput
from fastapi import status
from fastapi.responses import JSONResponse, Response
from PIL import Image


class Text2ImgControllers:
    def __init__(self):
        # setup pipeline component
        self.pipeline_components = PipelineComponents()
        self.shared_component = self.pipeline_components.pipeline_setup()

        self.diff_utils = Utils()
        self.sharedValues = sharedValues.load_shared_values()
        self.device = self.pipeline_components.device

    async def text2img(self, req: Text2Image_Type):
        pipeline = AutoPipelineForText2Image.from_pipe(self.shared_component)

        prompt = req.prompt
        negative_prompt = req.negative_prompt
        width = req.width
        height = req.height
        steps = req.steps
        guidance_scale = req.guidance_scale
        batch_size = req.batch_size
        scheduler = self.pipeline_components.get_scheduler(
            req.scheduler, req.use_kerras
        )
        # self.pipeline.scheduler.use_kerras_sigmas = req.use_kerras
        seed, generator = self.diff_utils.seed_handler(req.seed)
        print(seed)

        lora_path = (
            "/kaggle/working/sapphire/src/models/loras/ghibli_style_offset.safetensors"
        )

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

        result: StableDiffusionPipelineOutput = pipeline(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            generator=generator,
            guidance_scale=guidance_scale,
            num_inference_steps=steps,
            num_images_per_prompt=batch_size,
        )

        
        additional_data = {
            "message": "Additional data along with image",
            "width": width,
            "height": height,
            "seed": seed,
            "steps": steps,
            "scheduler": req.scheduler,
            "guidance_scale": guidance_scale,
            "num_inference_steps": steps,
            "batch_size": batch_size,
        }
        img_data_json = self.diff_utils.handle_generated_images(result.images,base64_for_img=False)

        additional_data_json = json.dumps(additional_data)

        # Creating a JSON response with image bytes and additional data
        response_data = {
            "enc_img_data": img_data_json,  # Assuming byte_img is converted to base64 string
            "additional_data": additional_data_json,
        }
        return Response(content=img_data_json,media_type="image/png")
        # return JSONResponse(content=response_data, status_code=status.HTTP_200_OK)

    # except Exception as e:
    #     print(e)
    #     return HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
    #     )

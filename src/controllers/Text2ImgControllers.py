import common.shared as sharedValues
from common.PipelineComponents import PipelineComponents
from common.Types import Text2Image_Type
from common.Utils import Utils
from diffusers import AutoPipelineForText2Image
from diffusers.pipelines.stable_diffusion.pipeline_output import \
    StableDiffusionPipelineOutput
from fastapi.responses import Response,JSONResponse
from PIL import Image
import json,base64


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
            num_images_per_prompt=req.batch_size,
        )

        additional_data = {"message": "Additional data along with image","width":width,"height":height}
        byte_img = self.diff_utils.handle_generated_images(result.images)
        # return {"image":byte_img.decode("base64"),"data":additional_data}
        # response = Response(content=byte_img, media_type="image/png")
        additional_data_json = json.dumps(additional_data)
        byte_img_base64 = base64.b64encode(byte_img).decode("utf-8")

    # Creating a JSON response with image bytes and additional data
        response_data = {
            "image":byte_img_base64,  # Assuming byte_img is converted to base64 string
            "additional_data": additional_data_json
        }

        return JSONResponse(content=response_data)
        # return response ,additional_data

    # except Exception as e:
    #     print(e)
    #     return HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
    #     )

from fastapi.responses import Response
from diffusers import AutoPipelineForText2Image
from diffusers.pipelines.stable_diffusion.pipeline_output import StableDiffusionPipelineOutput
from diffusers.utils import make_image_grid
from common.PipelineComponents import PipelineComponents


from PIL import Image
from common.Types import Text2Image_Type
import common.shared as sharedValues
from common.Utils import Utils


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

        result:StableDiffusionPipelineOutput = pipeline(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            generator=generator,
            guidance_scale=guidance_scale,
            num_inference_steps=steps,
            num_images_per_prompt=req.batch_size,
        )
        images_length = len(result.images)
        print(type(result))
        print(images_length)

        result_images = ""
        if images_length > 1 :
            rows,cols =self.diff_utils.generate_grid_size(images_length)
            result_images = make_image_grid(result.images,rows=rows,cols=cols)
        else:
            result_images = result.images[0]   
        byte_img = self.diff_utils.get_byte_img(result_images)

        return Response(content=byte_img, media_type="image/png")

    # except Exception as e:
    #     print(e)
    #     return HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
    #     )

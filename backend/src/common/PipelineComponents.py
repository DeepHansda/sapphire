from diffusers import AutoencoderKL, AutoPipelineForText2Image, StableDiffusionPipeline
import common.shared as sharedValues
import torch
import asyncio
from typing import Optional
from common.const import INIT_DEVICE, CHECKPOINT, LORA
from diffusers import (
    DDIMScheduler,
    DDPMScheduler,
    DPMSolverMultistepScheduler,
    DPMSolverSinglestepScheduler,
    EulerAncestralDiscreteScheduler,
    EulerDiscreteScheduler,
    HeunDiscreteScheduler,
    KDPM2AncestralDiscreteScheduler,
    KDPM2DiscreteScheduler,
    LMSDiscreteScheduler,
    PNDMScheduler,
    UniPCMultistepScheduler,
)


class PipelineComponents:
    def __init__(self):
        self.component_pipeline: StableDiffusionPipeline = None
        self.torch_float = torch.float16
        self.sharedValues = sharedValues.load_shared_values()
        print(self.sharedValues)
        self.device = self.sharedValues.get(INIT_DEVICE)

    def pipeline_setup(self):
        if self.device == "cpu":
            self.torch_float = torch.float32
            print(self.torch_float)
        # model_path = "/kaggle/working/sapphire//src/models/checkpoints/v1-5-pruned-emaonly.safetensors"
        sd_model_path = self.sharedValues.get(CHECKPOINT)
        print("pipeline setup : " + sd_model_path)
        vae_path = "/kaggle/working/sapphire/backend/src/models/vae/vae-ft-ema-560000-ema-pruned.safetensors"
        if self.device == "cuda":
            torch.cuda.empty_cache()
        if vae_path:
            vae = AutoencoderKL.from_single_file(
                vae_path, torch_dtype=self.torch_float
            ).to(self.device)

        comp_pipeline: StableDiffusionPipeline = (
            StableDiffusionPipeline.from_single_file(
                sd_model_path,
                vae=vae,
                torch_dtype=self.torch_float,
                use_safetensors=True,
                safety_checker=None,
            ).to(self.device)
        )
        self.component_pipeline = comp_pipeline

    def get_pipeline(self, ues_lora: Optional[bool] = False) -> StableDiffusionPipeline:
        if ues_lora == True:

            lora_path = self.sharedValues.get(LORA)
            print(lora_path)
            # lora = "sapphire/backend/src/models/loras/ghibli_style_offset.safetensors"
            lora_weight_name = lora_path.split("/")[-1]
            lora_apdapter_name = lora_weight_name.split(".")[0]

            active_adapters = self.component_pipeline.get_active_adapters()
            if len(active_adapters) > 0 and lora_apdapter_name == active_adapters[0]:
                print(active_adapters)
                return self.component_pipeline

            # print(lora_weight_name)
            # print(lora_apdapter_name)
            if len(active_adapters) > 0:
                self.component_pipeline.unload_lora_weights()
                self.component_pipeline.unfuse_lora()
            self.component_pipeline.load_lora_weights(
                lora_path, weight_name=lora_weight_name, adapter_name=lora_apdapter_name
            )
            # self.component_pipeline = lora_pipeline
            return self.component_pipeline
        else:
            self.component_pipeline.unload_lora_weights()
            self.component_pipeline.unfuse_lora()
            active_adapters = self.component_pipeline.get_active_adapters()
            print(active_adapters)
            return self.component_pipeline

    def get_scheduler(self, scheduler_name: str, use_kerras: bool = False):

        scheduler_name = scheduler_name.lower()
        config = self.component_pipeline.scheduler.config

        scheduler_classes = {
            "eular": EulerDiscreteScheduler,
            "eular_a": EulerAncestralDiscreteScheduler,
            "heun": HeunDiscreteScheduler,
            "lms": LMSDiscreteScheduler,
            "unipc": UniPCMultistepScheduler,
            "dpm_2": KDPM2DiscreteScheduler,
            "dpm_2_a": KDPM2AncestralDiscreteScheduler,
            "dpmpp_2m": DPMSolverMultistepScheduler,
            "dpmpp_sde": DPMSolverSinglestepScheduler,
            "dpmpp_2m_sde": DPMSolverMultistepScheduler,
        }
        scheduler_class = scheduler_classes.get(scheduler_name)
        if scheduler_class:
            scheduler = scheduler_class.from_config(config)
            if use_kerras is True:
                scheduler.use_karras_sigmas = use_kerras
                # self.component_pipeline.scheduler.config.use_karras_sigmas = use_kerras
            return scheduler
        else:
            raise ValueError(f"Unsupported scheduler: {scheduler_name}")

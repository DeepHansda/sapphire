from diffusers import AutoencoderKL, AutoPipelineForText2Image, StableDiffusionPipeline
import common.shared as sharedValues
import torch

class PipelineComponents:
    def __init__(self):
        self.component_pipeline = None
        self.sharedValues = sharedValues.load_shared_values()
        self.device = self.sharedValues.get("init_device")
        self.torch_float = torch.float16

        if self.device == "cpu":
            self.torch_float = torch.float32
            print(self.torch_float)


    def pipeline_setup(self):
        model_path = "/kaggle/working/sapphire/src/models/checkpoints/v1-5-pruned-emaonly.safetensors"
        vae_path = "/kaggle/working/sapphire/src/models/vae/vae-ft-ema-560000-ema-pruned.safetensors"
        if vae_path:
            vae = AutoencoderKL.from_single_file(
                vae_path, torch_dtype=self.torch_float
            ).to(self.device)
       
        
        comp_pipeline: StableDiffusionPipeline = StableDiffusionPipeline.from_single_file(
            model_path,
            vae=vae,
            torch_dtype=self.torch_float,
            use_safetensors=True,
            safety_checker=None,
        ).to(self.device)

        self.component_pipeline = comp_pipeline.components
    def get_component_pipeline(self):
        return self.component_pipeline
    

import json

from common.devices import set_device
from common.Folder_Paths import add_folders_in_models_folder, models_dir
from common.shared import save_shared_values
from common.Utils import Utils
from controllers.Text2ImgControllers import Text2ImgControllers
from common.PipelineComponents import PipelineComponents


commonUtils = Utils()
text2ImageControllers = Text2ImgControllers()
component_pipeline = PipelineComponents()



async def startUp():
    
    await set_device()
    add_folders_in_models_folder()

    all_models = {}
    all_models = commonUtils.get_all_models()
    if not all_models["checkpoints"]:
        url = "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors"
        output_path = models_dir + "/checkpoints/v1-5-pruned-emaonly.safetensors"
        await commonUtils.download_with_wget(url, output_path)
        all_models = commonUtils.get_all_models()

    default_checkpoint = {}

    checkpoint_name, checkpoint_path = next(
        iter(all_models.get("checkpoints", {}).items()), (None, None)
    )
    default_checkpoint[checkpoint_name] = checkpoint_path

    save_shared_values(default_checkpoint)
    # component_pipeline.pipeline_setup()
    
    # text2ImageControllers.setup()

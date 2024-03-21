import json

from common.devices import set_device
from common.Folder_Paths import add_folders_in_models_folder, models_dir
from common.shared import save_shared_values
from common.Utils import Utils
from common.const import CHECKPOINTS,CHECKPOINT

commonUtils = Utils()


async def startUp():

    await set_device()
    add_folders_in_models_folder()

    all_models = {}
    all_models = commonUtils.get_all_models()
    if not all_models[CHECKPOINTS]:
        url = "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors"
        output_path = models_dir + "/checkpoints/v1-5-pruned-emaonly.safetensors"
        await commonUtils.download_with_wget(url, output_path)
        all_models = commonUtils.get_all_models()

    default_checkpoint = {}

    checkpoint_name, checkpoint_path = next(
        iter(all_models.get(CHECKPOINTS, {}).items()), (None, None)
    )
    default_checkpoint[CHECKPOINT] = checkpoint_path

    save_shared_values(default_checkpoint)

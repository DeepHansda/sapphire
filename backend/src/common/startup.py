from common.devices import set_device
from common.Folder_Paths import add_folders_in_models_folder, models_dir
from common.shared import save_shared_values,load_shared_values
from common.Utils import Utils
from common.const import CHECKPOINTS,CHECKPOINT
from common.Folder_Paths import Folder_paths
import asyncio,json


commonUtils = Utils()
folder_path = Folder_paths()
async def startUp():

    print("start up function running")
    startup_event = asyncio.Event()
    await set_device()
    folder_path.add_init_folders()
    add_folders_in_models_folder()

    all_models = {}
    all_models = commonUtils.get_all_models()
    if not all_models[CHECKPOINTS]:
        url = "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors"
        output_path = models_dir + "/checkpoints/v1-5-pruned-emaonly.safetensors"
        await commonUtils.download_with_wget(url, output_path)
        all_models = commonUtils.get_all_models()
    
    default_checkpoint = {}
    shard_values = load_shared_values()
    if CHECKPOINT not in shard_values or shard_values[CHECKPOINT] == "":
        checkpoint_name, checkpoint_path = next(
            iter(all_models.get(CHECKPOINTS, {}).items()), (None, None)
        )
        default_checkpoint[CHECKPOINT] = checkpoint_path

        save_shared_values(default_checkpoint,save=True)
    await startup_event.wait()

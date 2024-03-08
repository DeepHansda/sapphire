from common.Utils import Utils
from common.shared import save_shared_values
import json

commonUtils = Utils()

def startUp():
    all_models = {}
    all_models = commonUtils.get_all_models()
    if not all_models["checkpoints"]:
        url = "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors"
        output_path = "/kaggle/working/sapphire/src/models/checkpoints/v1-5-pruned-emaonly.safetensors"
        commonUtils.download_with_wget(url, output_path)
        all_models = commonUtils.get_all_models()
    checkpoints = {}
    # if type(all_models["checkpoints"]) == dict:
    #     checkpoints = dict(all_models["checkpoints"]).values()[0]
    # checkpoints["checkpoint"] = (all_models["checkpoints"])
    print(all_models["checkpoints"])
    # save_shared_values(checkpoints)

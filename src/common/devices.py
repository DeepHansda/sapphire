import logging
import os
import subprocess

import torch

CUDA = "cuda"
CPU = "cpu"


def get_gpu_names() -> set:
    gpu_names = set()
    out = subprocess.check_output(["nvidia-smi", "-L"])
    for l in out.split(b"\n"):
        if len(l) > 0:
            gpu_names.add(l.decode("utf-8").split(" (UUID")[0])
    return gpu_names


def set_device_in_environment(device: str):
    os.environ["DEVICE"] = device


def set_device():
    if torch.cuda.is_available():
        gpu_name = get_gpu_names().pop()
        set_device_in_environment(CUDA)
        print(f"Using GPU {gpu_name}")
        logging.info(f"Using GPU {gpu_name}")
    else:
        set_device_in_environment(CPU)
        print(f"Using CPU For All Tasks")
        logging.info(f"Using CPU For All Tasks")

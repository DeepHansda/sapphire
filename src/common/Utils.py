import io
import os
import subprocess
from random import randint
from typing import Any, Callable

import torch
from common.Folder_Paths import models_dir
from common.Types import Text_Emmbed_Type
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
from fastapi import HTTPException
from PIL import Image


class Utils:
    def __init__(self):
        pass

    def seed_generator(self):
        pass

    def get_text_embds(self, args: Text_Emmbed_Type):
        pipe = args.pipeline
        prompt = args.prompt
        negative_prompt = args.negative_prompt
        max_length = pipe.tokenizer.model_max_length
        input_ids = pipe.tokenizer(prompt, return_tensors="pt").input_ids
        input_ids = input_ids.to("cuda")

        negative_ids = pipe.tokenizer(
            negative_prompt,
            truncation=False,
            padding="max_length",
            max_length=input_ids.shape[-1],
            return_tensors="pt",
        ).input_ids
        negative_ids = negative_ids.to("cuda")
        concat_embeds = []
        neg_embeds = []
        for i in range(0, input_ids.shape[-1], max_length):
            concat_embeds.append(pipe.text_encoder(input_ids[:, i : i + max_length])[0])
            neg_embeds.append(pipe.text_encoder(negative_ids[:, i : i + max_length])[0])

        prompt_embeds = torch.cat(concat_embeds, dim=1)
        negative_prompt_embeds = torch.cat(neg_embeds, dim=1)

        return prompt_embeds, negative_prompt_embeds

    def get_scheduler(
        self, pipeline: Any, scheduler_name: str, use_kerras: bool = False
    ):

        scheduler_name = scheduler_name.lower()
        config = pipeline.scheduler.config

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
            return scheduler
        else:
            raise ValueError(f"Unsupported scheduler: {scheduler_name}")

    def get_byte_img(self, image: Image.Image):
        buf = io.BytesIO()
        image.save(buf, format="PNG")
        byte_img = buf.getvalue()
        return byte_img

    def random_seed(self, n: int) -> int:
        range_start = 10 ** (n - 1)
        range_end = (10**n) - 1
        return randint(range_start, range_end)

    def exception_handler(self, func: Callable[..., Any]) -> Callable:
        async def wrapper(*args, **kwargs):
            try:
                return await func(*args, **kwargs)
            except Exception as e:
                # Return the exception as a response
                raise HTTPException(status_code=500, detail=str(e))

        return wrapper

    def get_all_models(self) -> dict:
        all_models_dic = {}
        for root, directories, files in os.walk(models_dir):
            for d in directories:
                models_dic = {}
                dir_path = os.path.join(root, d)

                for f in os.listdir(dir_path):
                    file_path = os.path.join(dir_path, f)
                    models_dic[f] = file_path

                all_models_dic[d] = models_dic
        return all_models_dic

    async def download_with_wget(self, url: str, output_path: str):
        try:
            # Command to execute wget with the provided URL and output path
            command = [
                "wget",
                "-c",
                url,
                "-O",
                output_path,
                "--progress=bar",
                "--show-progress",
            ]

            # Start the subprocess and redirect stderr to stdout
            process = subprocess.Popen(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
            )

            # print(process.stdout.read())

            # Read the output stream line by line
            for line in process.stdout:
                print(
                    line.strip()
                )  # Print the line without trailing newline characters

            # Wait for the subprocess to finish
            return_code = process.wait()

            # Check the return code for errors
            if return_code != 0:
                print(
                    f"An error occurred during the download (return code: {return_code})"
                )
        except Exception as e:
            print(f"An error occurred: {e}")

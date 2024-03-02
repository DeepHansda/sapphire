from typing import Dict, List
import os
import json


def load_file_names():
    with open("file_names.json", "r") as f:
        return json.load(f)

# Save file names to the configuration file
def save_file_names(file_names):
    with open("file_names.json", "w") as f:
        json.dump(file_names, f)

def load_shared_models(file_names)
class SharedModelsController:
    def __init__(self):
        pass
    
    def get_shared_files(self,req:Request) -> Response:
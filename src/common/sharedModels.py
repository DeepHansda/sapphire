from typing import Dict, List
import os
import json


def load_file_names():
    file_path = "file_names.json"
    
    # Check if the file exists
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    else:
        # If the file doesn't exist, create a new file
        with open(file_path, "w") as f:
            # Write an empty JSON object to the file
            json.dump({}, f)
        # Return an empty dictionary
        return {}

# Save file names to the configuration file
def save_file_names(file_names: Dict[str,str]):
    with open("file_names.json", "w") as f:
        json.dump(file_names, f)

async def retrive_shared_models(file_names: Dict[str,str]):
    existing_file_names = load_file_names()
    
    if file_names is None:
        return existing_file_names
    
 
    new_file_names = set(file_names.values())
    
    # Check if all file names provided in the request exist in the existing file names
    if not set(existing_file_names.values()).issuperset(new_file_names):
        # If any file name doesn't exist, overwrite the JSON file with the new file names
        save_file_names(file_names)
        return load_file_names() 
    else:
        return existing_file_names
         
    
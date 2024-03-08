import json
import os
from typing import Dict, List


def load_shared_values():
    file_path = "shared_values.json"

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
def save_shared_values(shared_values: Dict[str, str]):
    with open("shared_values.json", "w") as f:
        json.dump(shared_values, f)


async def retrive_shared_values(shared_values: Dict[str, str]):
    existing_shared_values = load_shared_values()

    if shared_values is None:
        return existing_shared_values

    new_shared_values = set(shared_values.values())

    # Check if all file names provided in the request exist in the existing file names
    if not set(existing_shared_values.values()).issuperset(new_shared_values):
        # If any file name doesn't exist, overwrite the JSON file with the new file names
        save_shared_values(shared_values)
        return load_shared_values()
    else:
        return existing_shared_values
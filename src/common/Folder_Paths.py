import os
base_path = os.path.dirname(os.path.realpath(__file__))
cwd = os.getcwd()
MODELS = "models"
models_dir = os.path.join(cwd, MODELS)



folder_names_and_paths = {
    "checkpoints": (os.path.join(models_dir, "checkpoints")),
    "loras": (os.path.join(models_dir, "loras")),
    "vae": (os.path.join(models_dir, "vae")),
}

def folder_creator(folder_path:str):
        os.makedirs(folder_path,exist_ok=True)
        print("folder created!")
        
        
def add_folders_in_models_folder():
    for folder_name, folder_path in folder_names_and_paths.items():
        folder_creator(folder_path)
        
class Folder_paths:
    
    def __init__(self):
        print(base_path)
        print(models_dir)
        
   
        
    def add_folder_in_cwd(self,folder_name:str):
        folder_path = os.path.join(cwd,folder_name)
        if os.path.exists(folder_path):
            print(f"{folder_name} folder already exists! ✔") 
        else:
            folder_creator(folder_path)
    
             
    def add_folders_in_models_path(self,folder_name:str,folder_path:str):
        global folder_names_and_paths
        if folder_name not in folder_names_and_paths:
            return
        else:
            folder_names_and_paths[folder_name] = folder_path
            print(f"{folder_name} folder added to models path!")
   

    def search_file_in_path(self, folder_name: str, file_name: str):
        folder_path = os.path.join(models_dir, folder_name) if folder_name in folder_names_and_paths else os.path.join(cwd, folder_name)
        error_msg = f"{file_name} not found in {folder_name} folder!"
        
        if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
            print(error_msg)
            raise FileNotFoundError(error_msg)
        
        for root, _, files in os.walk(folder_path):
            for f in files:
                if f == file_name:
                    p = os.path.join(root, f)
                    return p
        
        print(error_msg)
        raise FileNotFoundError(error_msg)


 
        
        
    
    
        
    
    
    
        
    
    



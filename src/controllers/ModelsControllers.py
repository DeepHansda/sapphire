import os,json
from common.Folder_Paths import models_dir
from fastapi import HTTPException,status
from fastapi.responses import JSONResponse




class ModelsController():
    def __init__(self):
        pass
    
    async def get_models(self,model_type:str):
        try:
            folder_path = None
            if model_type in ("checkpoints" , "sd_models" , "stable_diffusion_models" ,"stable_diffusion"):
                folder_path = os.path.join(models_dir, "checkpoints")
            elif model_type == "loras" or model_type == "lora":
                folder_path = os.path.join(models_dir, "loras")
            else:            
                folder_path = os.path.join(models_dir, model_type)    
                
            
            if not os.path.isdir(folder_path):
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="models directory does not exist")   
           
           
            models_dic = {}
                   
            for root, _, files in os.walk(folder_path):
                for f in files:
                    models_dic[f] = os.path.join(root, f)    
    
            return JSONResponse(status_code=status.HTTP_200_OK,content=models_dic)
        except Exception as e:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(e))
            
            
            
            
    async def get_all_models(self):
        all_models_dic = {}
        
        for root, directories, files in os.walk(models_dir):
            for d in directories:
                models_dic = {}
                dir_path = os.path.join(root, d)
                
                for f in os.listdir(dir_path):
                    file_path = os.path.join(dir_path, f)
                    models_dic[f] = file_path
                    
                all_models_dic[d] =  models_dic
        return JSONResponse(status_code=status.HTTP_200_OK,content= all_models_dic)
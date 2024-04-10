from common.Folder_Paths import cwd
from common.const import OUTPUT
from fastapi import Response,status
from fastapi.responses import JSONResponse
import os,json

from common.Utils import Utils


common_utils = Utils()
class ImagesControllers:
    def __init__(self):
        pass
    
    
    @common_utils.exception_handler
    async def getImagesByType(self,imgs_type:str):
        f_path = "/kaggle/working/sapphire/backend/src/output/text2img"
        
        if not os.path.exists(f_path):
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": f"images don't exist!","data":"[]"})
        base64_img_list = []
        img_data = {}
        for root, directories, files in os.walk(f_path):
            for dir in directories:
                as_path = os.path.join(root, dir)
                for img in os.listdir(as_path):
                    img_path =  os.path.join(as_path, img)
                    if img_path.endswith(".png"):
                        b64_img = common_utils.byte_img_to_base64(byte_img=None,img_path=img_path)
                    if img_path.endswith(".json"):
                        with open(img_path) as f:
                            img_data = json.load(f)
                
                    base64_img_list.append({"img_data":img_data,"enc_img":b64_img})
                    
        json_img_list = json.dumps({"imgs_list":base64_img_list}) 
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_img_list)
        # print(directories)
        
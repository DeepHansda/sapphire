from pydantic import BaseModel

class Text2Image_Type(BaseModel):
    prompt:str
    
    
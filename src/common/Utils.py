from common.Types import Text_Emmbed_Type
import torch

class Utils:
    def __init__(self):
        pass
    
    def seed_generator(self):
        pass
    
    def get_text_embds(args:Text_Emmbed_Type):
          pipe = args.pipeline
          prompt = args.prompt
          negative_prompt = args.negative_prompt
          max_length = pipe.tokenizer.model_max_length
          input_ids = pipe.tokenizer(prompt, return_tensors="pt").input_ids
          input_ids = input_ids.to("cuda")

          negative_ids = pipe.tokenizer(negative_prompt, truncation=False, padding="max_length", max_length=input_ids.shape[-1], return_tensors="pt").input_ids
          negative_ids = negative_ids.to("cuda")

          concat_embeds = []
          neg_embeds = []
          for i in range(0, input_ids.shape[-1], max_length):
              concat_embeds.append(pipe.text_encoder(input_ids[:, i: i + max_length])[0])
              neg_embeds.append(pipe.text_encoder(negative_ids[:, i: i + max_length])[0])

          prompt_embeds = torch.cat(concat_embeds, dim=1)
          negative_prompt_embeds = torch.cat(neg_embeds, dim=1)

          return prompt_embeds,negative_prompt_embeds

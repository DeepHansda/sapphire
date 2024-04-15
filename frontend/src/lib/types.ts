export interface ImgMetaData {
  prompt: string;
  negative_prompt: string;
  width: number;
  height: number;
  scheduler: string;
  steps: number;
  use_kerras: boolean;
  seed: number;
  guidance_scale: number;
}

export interface Text2Img {
  prompt: string;
  negative_prompt: string;
  scheduler: string;
  seed: number;
  width: number;
  height: number;
  steps: number;
  use_kerras: boolean;
  use_lora: boolean;
  guidance_scale: number;
  batch_size: number;
  fixed_seed: boolean;
}

export interface AllImagesState {
  date: any;
  message: any;
  text2img_list: [],
  img2img_list: [],
  isLoading: boolean;
}

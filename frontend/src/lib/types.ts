import { Dispatch, SetStateAction } from "react";

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

export interface GenerationType {
  prompt: string;
  negative_prompt: string;
  scheduler: string;
  seed: number;
  width: number;
  height: number;
  steps: number;
  use_kerras: boolean;
  use_lora: boolean;
  lora_scale: number;
  guidance_scale: number;
  batch_size: number;
  fixed_seed: boolean;
  image?: string;
  strength?: number;
}


export interface AllImagesState {
  message: any;
  text2img_list: [],
  img2img_list: [],
  isLoading: boolean;
}

export interface AllModelsState {
  allModels: {
    all_models: {},
    selected_models: {}
  },
  isLoading: boolean,
  message: string
}
export interface AppContextType {
  formDataState: GenerationType;
  generatedResponse: {};
  handleFormState: (v: any) => void;
  handleFormSubmit: (obj: { [key: string]: any }, type: string) => any;
  getImages: (tag: string) => any;
  getModels: () => any;
  allModelsState: AllModelsState;
  allImagesState: AllImagesState
  getSelectedValues: () => any
  updateModels: (data: any) => any
  openSidebar: boolean
  setOpenSidebar: Dispatch<SetStateAction<boolean>>
};
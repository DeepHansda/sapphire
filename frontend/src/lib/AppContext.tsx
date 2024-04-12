import { createContext } from "react";
import { AllImagesState, Text2Img } from "./types";
import { initialImagesState } from "./stateMangement/reducers/imagesReducers";

type FormContextType = {
  formDataState: Text2Img;
  generatedResponse: {};
  handleFormState: (v: any) => void;
  handleFormSubmit: (obj: { [key: string]: any }) => any;
  getImages: (tag: string) => any;
  allImagesState:AllImagesState
};
export const defaultFormData: Text2Img = {
  prompt: "",
  negative_prompt: "",
  scheduler: "eular",
  seed: -1,
  width: 512,
  height: 512,
  steps: 20,
  use_kerras: false,
  use_lora: false,
  guidance_scale: 8.0,
  batch_size: 1,
  fixed_seed: false,
};

export const AppContext = createContext<FormContextType>({
  formDataState: defaultFormData,
  handleFormState: (v: any) => {},
  generatedResponse: {},
  handleFormSubmit: (obj: { [key: string]: any }): any => {},
  getImages: (tag: string): any => {},
  allImagesState: initialImagesState,
});

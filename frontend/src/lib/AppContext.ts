// "use client"
// import { createContext } from "react";
import { AllImagesState, GenerationType } from "./types";

export type FormContextType = {
  formDataState: GenerationType;
  generatedResponse: {};
  handleFormState: (v: any) => void;
  handleFormSubmit: (obj: { [key: string]: any }, type: string) => any;
  getImages: (tag: string) => any;
  allImagesState: AllImagesState
};
export const defaultFormData: GenerationType = {
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

// export const AppContext = createContext<FormContextType>({
//   formDataState: defaultFormData,
//   handleFormState: (v: any) => {},
//   generatedResponse: {},
//   handleFormSubmit: (obj: { [key: string]: any }): any => {},
//   getImages: (tag: string): any => {},
//   allImagesState: initialImagesState,
// });

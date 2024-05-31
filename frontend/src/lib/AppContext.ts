// "use client"
// import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { AllImagesState, GenerationType, AllModelsState } from "./types";
import { initialModelsState } from "@/lib/stateMangement/reducers/modelsReducers";

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
  lora_scale:0.75,
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

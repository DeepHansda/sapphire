import { createContext } from "react"
import { Text2Img } from "./types"

type FormContextType = {
    formDataState: Text2Img,
    handleFormState: (v: any) => void,

}
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
    fixed_seed:false
}

export const AppContext = createContext<FormContextType>({
    formDataState: defaultFormData,
    handleFormState: (v: any)=>{}
})

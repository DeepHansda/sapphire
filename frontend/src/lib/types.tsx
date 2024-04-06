export interface ImgMetaData{
    prompt: string
    negative_prompt: string
    width: number
    height: number
    scheduler: string
    steps: number
    use_kerras: boolean
    seed: number
    guidance_scale: number
}
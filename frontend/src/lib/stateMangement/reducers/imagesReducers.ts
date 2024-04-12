import { imageReducersConst } from "@/lib/const"



export const initialImagesState = {
    img_list: [{}],
    isLoading: false,
    message: ""
}
export const imagesReducers = (state = initialImagesState, action) => {
    const { type, payload } = action
    switch (type) {
        case imageReducersConst.imagesRequest:
            return {
                ...state,
                isLoading: true
            }

        case imageReducersConst.getImages:
            return {
                ...state,
                img_list: payload,
                isLoading: false,
            }
        case imageReducersConst.addImages:
            const today_list = state.img_list.find(item => item.date == payload.img_date)
            console.log(today_list)
            return {
                ...state,
                img_list: [payload.img_d, ...today_list?.sub_dir_images],
                isLoading: false,
                message: "success"

            }
        case imageReducersConst.errorImages:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        default:
            return state
    }

}
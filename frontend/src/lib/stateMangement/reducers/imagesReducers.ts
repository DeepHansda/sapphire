import { imageReducersConst, IMG2IMG, TEXT2IMG } from "@/lib/const"
import { AllImagesState } from "@/lib/types"



export const initialImagesState: AllImagesState = {
    text2img_list: [],
    img2img_list: [],
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
            const img_list = payload?.data
            if (payload.tag === TEXT2IMG) {

                return {
                    ...state,
                    text2img_list: img_list,
                    isLoading: false,
                }
            }
            if (payload.tag === IMG2IMG) {

                return {
                    ...state,
                    img2img_list: img_list,
                    isLoading: false,
                }
            }
        case imageReducersConst.addImages:
            let updatedList = [];
            const initImgList = payload.type === TEXT2IMG ? state.text2img_list : state.img2img_list;

            const existingDateIndex = initImgList.findIndex(item => item.date === payload.img_date);

            if (existingDateIndex === -1) {
                // If the date doesn't exist in the list, create a new entry
                const subDirImagesList = payload.enc_imgs?.map(enc_img => ({
                    img_data: payload.img_data,
                    enc_img: enc_img,
                })) || [];

                updatedList = [{
                    sub_dir_images: subDirImagesList,
                    date: payload.img_date,
                }, ...initImgList];
            } else {
                updatedList = initImgList.map((item, index) => {
                    if (index === existingDateIndex) {
                        const subDirImagesList = payload.enc_imgs?.map(enc_img => ({
                            img_data: payload.img_data,
                            enc_img: enc_img,
                        })) || [];
                        const updatedSubDirImages = [...subDirImagesList, ...item.sub_dir_images];
                        return { ...item, sub_dir_images: updatedSubDirImages };
                    }
                    return item;
                });
            }

            return {
                ...state,
                isLoading: false,
                message: "success",
                [payload.type === TEXT2IMG ? "text2img_list" : "img2img_list"]: updatedList,
            };


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
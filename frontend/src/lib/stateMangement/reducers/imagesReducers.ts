import { imageReducersConst, IMG2IMG, TEXT2IMG } from "@/lib/const"



export const initialImagesState = {
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
            let updated_list = [];
            let init_img_list = [];

            if (payload.type === TEXT2IMG) {
                init_img_list = state.text2img_list;
            } else if (payload.type === IMG2IMG) {
                init_img_list = state.img2img_list;
            }

            const existingDateIndex = init_img_list.findIndex(item => item.date === payload.img_date);

            if (existingDateIndex === -1) {
                // If the date doesn't exist in the list, create a new entry
                const sub_dir_images_list = payload.enc_imgs?.map(enc_img => ({
                    img_data: payload.img_data,
                    enc_img: enc_img,
                })) || [];

                updated_list = [{
                    sub_dir_images: sub_dir_images_list,
                    date: payload.img_date,
                }, ...init_img_list];
            } else {
                updated_list = init_img_list.map((item, index) => {
                    if (index === existingDateIndex) {
                        const sub_dir_images_list = payload.enc_imgs?.map(enc_img => ({
                            img_data: payload.img_data,
                            enc_img: enc_img,
                        })) || [];
                        const updatedSubDirImages = [...sub_dir_images_list, ...item.sub_dir_images];
                        return { ...item, sub_dir_images: updatedSubDirImages };
                    }
                    return item;
                });
            }

            return {
                ...state,
                text2img_list: updated_list,
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
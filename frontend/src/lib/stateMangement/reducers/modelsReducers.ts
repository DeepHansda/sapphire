export const initialModelsState = {
    allModels: {},
    selectedModels: {},
    isLoading: false,
    message: ""
}

import { modelsReducersConst } from "@/lib/const"

export const modelsReducers = (state = initialModelsState, action) => {
    const { type, payload } = action
    switch (type) {
        case modelsReducersConst.modelsRequest:
            return {
                ...state,
                isLoading: true
            }
        case modelsReducersConst.getAllModels:
            return {
                ...state,
                isLoading: false,
                allModels: payload,
                message: "all models loaded!"
            }
        case modelsReducersConst.selectModels:
            return {
                ...state,
                isLoading: false,
                selectedModels: payload,
                message: "all selected models loaded!"
            }
        case modelsReducersConst.modelsError:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        default:
            return state
    }
}
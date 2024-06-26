"use client";
import {
  callApi,
  generateImg,
  getAllModels,
  getAllSelectedValues,
  getImagesByTag,
} from "@/lib/api";
import { defaultFormData } from "@/lib/AppContext";
import { imageReducersConst, modelsReducersConst } from "@/lib/const";
import {
  imagesReducers,
  initialImagesState,
} from "@/lib/stateMangement/reducers/imagesReducers";
import { ScrollShadow } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import { createContext, useReducer, useState } from "react";
import Sidebar from "../sidebar/Sidebar";

import {
  initialModelsState,
  modelsReducers,
} from "@/lib/stateMangement/reducers/modelsReducers";
import AppNavbar from "../appNavbar/AppNavbar";
import { AppContextType } from "@/lib/types";

export const AppContext = createContext<AppContextType>({
  formDataState: defaultFormData,
  handleFormState: () => { },
  generatedResponse: {},
  handleFormSubmit: (obj: { [key: string]: any; }, type: string): any => { },
  getImages: (tag: string): any => { },
  allImagesState: initialImagesState,
  getModels: () => { },
  allModelsState: initialModelsState,
  updateModels: (model: any) => { },
  openSidebar: false,
  setOpenSidebar: () => { }
});

export default function MainLayout({ children, ...props }: ThemeProviderProps) {
  const [formDataState, setFormDataState] = useState(defaultFormData);
  const [generatedResponse, setGeneratedResponse] = useState({});
  const [openSidebar, setOpenSidebar] = useState(false);
  const [imagesState, imagesDispatch] = useReducer(
    imagesReducers,
    initialImagesState
  );
  const [modlesState, modelsDispatch] = useReducer(
    modelsReducers,
    initialModelsState
  );


  const handleFormState = (v: any): void => {
    // console.log(v)
    setFormDataState((prevValues) => ({ ...prevValues, ...v }));
  };

  const handleFormSubmit = (obj: { [key: string]: any }, type: string) => {
    imagesDispatch({
      type: imageReducersConst.imagesRequest,
    });
    const formData = new FormData();

    for (const key in obj) {
      formData.append(key, obj[key]);
    }
    formData.append("want_enc_imgs", "true");
    formData.append("strength", "0.65");
    generateImg(formData, type)
      .then((result) => {
        console.log(result);
        let imgs = [];
        if (obj.batch_size > 1) {
          const json_list = result?.enc_img_data;
          imgs = JSON.parse(json_list)?.imgs_list;
        } else {
          imgs = [result?.enc_img_data];
        }

        const img_date = result?.date;
        imagesDispatch({
          type: imageReducersConst.addImages,
          payload: {
            img_data: JSON.parse(result?.additional_data),
            enc_imgs: imgs,
            img_date,
            type,
          },
        });
        return result;
      })
      .catch((error) => console.log(error));
  };

  const getImages = (tag: string) => {
    imagesDispatch({
      type: imageReducersConst.imagesRequest,
    });
    getImagesByTag(tag)
      .then((result) => {
        // console.log(JSON.parse(result));
        imagesDispatch({
          type: imageReducersConst.getImages,
          payload: { data: JSON.parse(result)?.img_list, tag },
        });
      })
      .catch((err) => {
        imagesDispatch({
          type: imageReducersConst.errorImages,
          payload: err.message,
        });
      });
  };

  const getModels = () => {
    modelsDispatch({
      type: modelsReducersConst.modelsRequest,
    });
    getAllModels()
      .then((result) => {
        modelsDispatch({
          type: modelsReducersConst.getAllModels,
          payload: result,
        });
      })
      .catch((error) => {
        modelsDispatch({
          type: modelsReducersConst.modelsError,
          payload: error,
        });
      });
  };

  const updateModels = (data: any) => {
    modelsDispatch({
      type: modelsReducersConst.modelsRequest,
    });
    console.log(data);
    const opt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    callApi("change-models-by-type", opt)
      .then((result) => {
        console.log(result);
        modelsDispatch({
          type: modelsReducersConst.getAllModels,
          payload: result,
        });
        getModels();
      })
      .catch((error) => {
        modelsDispatch({
          type: modelsReducersConst.modelsError,
          payload: error,
        });
      });
  };

  return (
    <NextThemesProvider defaultTheme="dark" {...props}>
      <AppContext.Provider
        value={{
          formDataState,
          handleFormState,
          handleFormSubmit,
          generatedResponse,
          getImages,
          allImagesState: imagesState,
          getModels,
          allModelsState: modlesState,
          updateModels,
          openSidebar,
          setOpenSidebar,
        }}
      >
        <div className="flex w-full h-screen backdrop-blur-lg bg-[#0000007d]">
          <Sidebar />
          <ScrollShadow
            size={60}
            offset={40}
            className="scrollbar-thin scrollbar-thumb-rounded-[100%] w-full max-h-screen  relative"
          >
            <AppNavbar />

            <div className="p-6">{children}</div>
          </ScrollShadow>
        </div>
      </AppContext.Provider>
    </NextThemesProvider>
  );
}

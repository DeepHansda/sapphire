"use client";
import {
  generateImg,
  getAllModels,
  getAllSelectedValues,
  getImagesByTag,
  getModelsByType,
} from "@/lib/api";
import { defaultFormData, FormContextType } from "@/lib/AppContext";
import { imageReducersConst, modelsReducersConst } from "@/lib/const";
import {
  imagesReducers,
  initialImagesState,
} from "@/lib/stateMangement/reducers/imagesReducers";
import { NextUIProvider, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { createContext, useReducer, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import {
  initialModelsState,
  modelsReducers,
} from "@/lib/stateMangement/reducers/modelsReducers";
import { error } from "console";

export const AppContext = createContext<FormContextType>({
  formDataState: defaultFormData,
  handleFormState: (v: any) => {},
  generatedResponse: {},
  handleFormSubmit: (obj: { [key: string]: any }, type: string): any => {},
  getImages: (tag: string): any => {},
  allImagesState: initialImagesState,
  getModels: () => {},
  allModelsState: initialModelsState,
  getSelectedValues: () => {},
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formDataState, setFormDataState] = useState(defaultFormData);
  const [generatedResponse, setGeneratedResponse] = useState({});
  const [imagesState, imagesDispatch] = useReducer(
    imagesReducers,
    initialImagesState
  );
  const [modlesState, modelsDispatch] = useReducer(
    modelsReducers,
    initialModelsState
  );
  const router = useRouter();

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

  const getModels =  () => {
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

  const getSelectedValues = () => {
    modelsDispatch({
      type: modelsReducersConst.modelsRequest,
    });
    getAllSelectedValues()
      .then((result) => {
        console.log(result)
        modelsDispatch({
          type: modelsReducersConst.selectModels,
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

  return (
    <NextUIProvider navigate={router.push}>
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
          getSelectedValues,
        }}
      >
        <div className="flex">
          <Sidebar />
          <ScrollShadow
            size={60}
            offset={40}
            className="scrollbar-thin scrollbar-thumb-rounded-[100%] w-full max-h-screen p-6 relative"
          >
            <div className="fixed">
              <Navbar />
            </div>
            <div className="mt-32">{children}</div>
          </ScrollShadow>
        </div>
      </AppContext.Provider>
    </NextUIProvider>
  );
}

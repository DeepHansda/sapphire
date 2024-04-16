"use client";
import { generateImg, getImagesByTag } from "@/lib/api";
import { defaultFormData, FormContextType } from "@/lib/AppContext";
import { imageReducersConst } from "@/lib/const";
import {
  imagesReducers,
  initialImagesState,
} from "@/lib/stateMangement/reducers/imagesReducers";
import { NextUIProvider, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { createContext, useReducer, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

export const AppContext = createContext<FormContextType>({
  formDataState: defaultFormData,
  handleFormState: (v: any) => {},
  generatedResponse: {},
  handleFormSubmit: (obj: { [key: string]: any }, type: string): any => {},
  getImages: (tag: string): any => {},
  allImagesState: initialImagesState,
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formDataState, setFormDataState] = useState(defaultFormData);
  const [generatedResponse, setGeneratedResponse] = useState({});
  const [state, dispatch] = useReducer(imagesReducers, initialImagesState);

  const router = useRouter();

  const handleFormState = (v: any): void => {
    // console.log(v)
    setFormDataState((prevValues) => ({ ...prevValues, ...v }));
  };

  const handleFormSubmit = (obj: { [key: string]: any }, type: string) => {
    dispatch({
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
        dispatch({
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
    dispatch({
      type: imageReducersConst.imagesRequest,
    });
    getImagesByTag(tag)
      .then((result) => {
        // console.log(JSON.parse(result));
        dispatch({
          type: imageReducersConst.getImages,
          payload: { data: JSON.parse(result)?.img_list, tag },
        });
      })
      .catch((err) => {
        dispatch({
          type: imageReducersConst.errorImages,
          payload: err.message,
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
          allImagesState: state,
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

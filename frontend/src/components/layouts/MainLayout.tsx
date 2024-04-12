"use client";
import { AppContext, defaultFormData } from "@/lib/AppContext";
import { NextUIProvider, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import {
  imagesReducers,
  initialImagesState,
} from "@/lib/stateMangement/reducers/imagesReducers";
import { imageReducersConst } from "@/lib/const";
import { generateText2Img, getImagesByTag } from "@/lib/api";

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

  const handleFormSubmit = (obj: { [key: string]: any }) => {
    dispatch({
      type: imageReducersConst.imagesRequest,
    });
    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }
    formData.append("want_enc_imgs", "true");
    generateText2Img(formData)
      .then((result) => {
        const img_d = {
          img_data: JSON.parse(result?.additional_data),
          enc_img: result?.enc_img_data,
        };
        const img_date = result?.date;
        dispatch({
          type: imageReducersConst.addImages,
          payload: {
            img_d,
            img_date,
          },
        });
        return result;
      })
      .catch((error) => console.log(error));
  };

  const getImages = (tag: string) => {
    console.log("calling");
    dispatch({
      type: imageReducersConst.imagesRequest,
    });
    getImagesByTag(tag)
      .then((result) => {
        dispatch({
          type: imageReducersConst.getImages,
          payload: JSON.parse(result)?.img_list,
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

"use client";

import { ImageEditors } from "@/components/imageEditor/ImaegEditors";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import { AppContext } from "@/components/layouts/MainLayout";
import PromptBox from "@/components/promptBox/PromptBox";
import { IMG2IMG } from "@/lib/const";
import { useContext, useEffect } from "react";

export default function Img2Img() {
  const { getImages, allImagesState, handleFormSubmit } =
    useContext(AppContext);

  useEffect(() => {
    getImages(IMG2IMG);
  }, []);
  console.log(allImagesState);
  return (
    <main className="w-full h-auto">
      <div className="flex flex-col w-full md:flex-row  justify-between  gap-4">
        <PromptBox />
        <ImageEditors />
      </div>
      <div>
        <ImageGallery img_list={allImagesState?.img2img_list} />
      </div>
    </main>
  );
}

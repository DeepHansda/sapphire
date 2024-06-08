"use client";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import { AppContext } from "@/components/layouts/MainLayout";
import PromptBox from "@/components/promptBox/PromptBox";
import { TEXT2IMG } from "@/lib/const";
import { useContext, useEffect } from "react";

export default function Text2Img() {
  const { getImages, allImagesState, handleFormSubmit } =
    useContext(AppContext);

  useEffect(() => {
    getImages(TEXT2IMG);
  }, []);

  return (
    <main className="w-full h-auto">
      <PromptBox />
      <div>
        <ImageGallery img_list={allImagesState?.text2img_list} />
      </div>
    </main>
  );
}

"use client";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import PromptBox from "@/components/promptBox/PromptBox";
import { AppContext } from "@/lib/AppContext";
import { useContext, useEffect } from "react";

export default function Text2Img() {
  const {getImages,allImagesState,handleFormSubmit} = useContext(AppContext);

  useEffect(() => {
    getImages("text2img")
  }, []);
  console.log(allImagesState);
  return (
    <main className="w-full h-auto">
      <PromptBox handleFormSubmit={handleFormSubmit} />
      <div>
        <ImageGallery img_list={allImagesState?.img_list} />
      </div>
    </main>
  );
}

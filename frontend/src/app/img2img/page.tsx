"use client";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import PromptBox from "@/components/promptBox/PromptBox";
import { getImagesByTag } from "@/lib/api";
import { AppContext } from "@/lib/AppContext";
import React, { useContext } from "react";
import useSWR from "swr";

export default function Img2Img() {
  const { handleFormSubmit, generatedResponse } = useContext(AppContext);

  const fetcher = () =>
    getImagesByTag("text2img")
      .then((response) => {
        const img_list = JSON.parse(response)?.img_list;
        console.log("", img_list);
        return img_list;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data } = useSWR("img2img", fetcher);
  return (
    <main className="w-full h-auto">
      <PromptBox handleFormSubmit={handleFormSubmit} />
      <div>
        <ImageGallery img_list={data} generatedResponse={generatedResponse} />
      </div>
    </main>
  );
}

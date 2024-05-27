"use client";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import { AppContext } from "@/components/layouts/MainLayout";
import PromptBox from "@/components/promptBox/PromptBox";
import { getKernels } from "@/lib/api";

import { useContext, useEffect } from "react";

export default function Home() {
  const { handleFormSubmit, generatedResponse } = useContext(AppContext);
  useEffect(() => {
    getKernels()
      .then((kernels) => {
        console.log(kernels);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="w-full h-auto">
      <PromptBox handleFormSubmit={handleFormSubmit} />
      <div>
        <ImageGallery generatedResponse={generatedResponse} />
      </div>
    </main>
  );
}

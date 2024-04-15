"use client"
import ImageGallery from "@/components/imageGallery/ImageGallery";
import { AppContext } from "@/components/layouts/MainLayout";
import PromptBox from "@/components/promptBox/PromptBox";

import { useContext } from "react";

export default function Home() {
  const { handleFormSubmit, generatedResponse } = useContext(AppContext);

  return (
    <main className="w-full h-auto">
      <PromptBox handleFormSubmit={handleFormSubmit} />
      <div>
        <ImageGallery generatedResponse={generatedResponse} />
      </div>
    </main>
  );
}

import { Text2Img } from "./types";

const api = "https://quail-heroic-ghastly.ngrok-free.app/proxy/8000";

export const generateText2Img = async (data: FormData) => {
  try {
    const opt = {
      method: "POST",
      body: data,
    };
    const res = await fetch(`${api}/text-to-img`, opt);
    return res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getImagesByTag = async (tag: string) => {
  try {
    const opt = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      cache: "no-cache",
    };
    const response = await fetch(`${api}/get-images/${tag}`, opt);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling by the caller
  }
};


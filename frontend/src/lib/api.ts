import { IMG2IMG, TEXT2IMG } from "./const";


const api = "https://rightly-assured-ray.ngrok-free.app/proxy/8000/";

export const generateImg = async (data: FormData, type: string) => {
  try {
    const opt = {
      method: "POST",
      body: data,
    };
    let res = {}
    if (type === TEXT2IMG) {
      res = await fetch(`${api}/text-to-img`, opt);
    }

    else if (type === IMG2IMG) {
      res = await fetch(`${api}/img-to-img`, opt);
    }
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
      // cache: "no-cache",
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


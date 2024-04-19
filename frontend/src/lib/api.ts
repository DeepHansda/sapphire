import { IMG2IMG, TEXT2IMG } from "./const";


const api = "https://rightly-assured-ray.ngrok-free.app/proxy/8000/";
const get_opt = {
  method: "GET",
  headers: new Headers({
    "ngrok-skip-browser-warning": "true",
  }),
  // cache: "no-cache",
};
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

    const response = await fetch(`${api}/get-image/${tag}`, get_opt);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message); // Re-throw the error for handling by the caller
  }
};

export const getAllModels = async () => {
  try {
    const response = await fetch(`${api}/get-all-models`, get_opt)
    if (!response.ok) {
      throw new Error("Failed to fetch modles");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const getAllSelectedValues = async () => {
  try {
    const response = await fetch(`${api}/get-selected-values`, get_opt)
    if (!response.ok) {
      throw new Error("Failed to fetch modles");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
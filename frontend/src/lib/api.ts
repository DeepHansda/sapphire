import { IMG2IMG, TEXT2IMG } from "./const";


const api = "https://quail-heroic-ghastly.ngrok-free.app/proxy/8000";
const kaggleBaseUrl = 'https://www.kaggle.com/api/v1';
const get_opt = {
  method: "GET",
  headers: new Headers({
    "ngrok-skip-browser-warning": "true",
  }),
  // cache: "no-cache",
};

export const callApi = async (link: string, fetch_opt: { [key: string]: any }, type?: string) => {
  try {
    const res = await fetch(`${api}/${link}`, fetch_opt);
    const data = await res.json();
    return data
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

}
export const generateImg = async (data: FormData, type: string) => {
  try {
    const opt = {
      method: "POST",
      body: data,
    };

    const res = await fetch(`${api}/${type == TEXT2IMG ? "text-to-img" : "img-to-img"}`, opt);

    const res_data = await res.json();
    return res_data
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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

export const getKernels = async () => {
  console.log("calling kernel")
  const headers = {
    'Content-Type': 'application/json',
    'X-KAGGLE-USERNAME': "deephansda",
    'X-KAGGLE-KEY': "73080a1f553d668ef182a9ce8d00ab8a"
  };
  try {
    const response = await fetch(`${kaggleBaseUrl}/kernels/list`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const kernelsList = await response.body();
      console.log(kernelsList);
      return kernelsList
    } else {
      console.error('Failed to fetch kernels list:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching kernels:', error);
  }
}
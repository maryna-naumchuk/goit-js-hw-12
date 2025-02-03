import axios from "axios";

export const BASE_URL = "https://pixabay.com/api/";
export const API_KEY = "48624871-26dc1fa3882184af001c85b14";

export async function fetchImages(query, page = 1, perPage = 15) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

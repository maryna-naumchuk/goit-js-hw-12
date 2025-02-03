import { fetchImages } from "./js/pixabay-api.js";
import {
  renderImages,
  clearGallery,
  toggleLoadMoreButton,
  addLoader,
  hideLoading,
} from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

const form = document.querySelector(".search-form");
const input = document.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector(".btn-load-more");

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
      position: "topRight",
      backgroundColor: "red",
      messageColor: "white",
      titleColor: "white",
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  addLoader();
  await fetchAndRenderImages();
}

async function onLoadMore() {
  currentPage += 1;
  addLoader();
  await fetchAndRenderImages();
  scrollBar();
}

async function fetchAndRenderImages() {
  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: "No results",
        message: `No images found for "${currentQuery}". Please try another query.`,
        position: "topRight",
        backgroundColor: "orange",
        messageColor: "white",
        titleColor: "white",
      });
      toggleLoadMoreButton(false);
      return;
    }

    renderImages(data.hits);

    const isEndOfCollection = currentPage * 15 >= totalHits;
    if (isEndOfCollection) {
      toggleLoadMoreButton(false);
      iziToast.info({
        title: "End of results",
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: "blue",
        messageColor: "white",
        titleColor: "white",
      });
    } else {
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    iziToast.error({
      title: "Error",
      message: `Error: ${error.message}`,
      position: "topRight",
      backgroundColor: "red",
      messageColor: "white",
      titleColor: "white",
    });
  } finally {
    hideLoading();
  }
}

function scrollBar() {
  const galleryItem = document.querySelector(".gallery a");
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2.6,
      behavior: "smooth",
    });
  }
}

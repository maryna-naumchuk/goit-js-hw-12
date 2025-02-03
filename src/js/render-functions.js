import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector(".gallery");
  const loader = document.querySelector(".loader");

  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="gallery-item">
            <article class="card">
              <a class="card-link" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                <img class="card-image" src="${webformatURL}" alt="${tags}" />
              </a>
              <div class="card-container">
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-heart"></i> Likes</p>
                  <p class="card-count">${likes}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-eye"></i> Views</p>
                  <p class="card-count">${views}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-comment"></i> Comments</p>
                  <p class="card-count">${comments}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-download"></i> Downloads</p>
                  <p class="card-count">${downloads}</p>
                </div>
              </div>
            </article>
          </li>
        `;
      }
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);

  gallery.parentNode.insertBefore(loader, gallery.nextSibling);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
      captionPosition: "bottom",
    });
  } else {
    lightbox.refresh();
  }
}

export function addLoader() {
  const loader = document.querySelector(".loader");
  loader.classList.remove("is-hidden");
}

export function hideLoading() {
  const loader = document.querySelector(".loader");
  loader.classList.add("is-hidden");
}

export function clearGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
}

export function toggleLoadMoreButton(show) {
  const loadMoreBtn = document.querySelector(".btn-load-more");
  loadMoreBtn.style.display = show ? "block" : "none";
}

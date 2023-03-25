import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetchPhotos';

const refs = {
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchQuery = '';
let page = 1;
let cardsOnPage = 0;

const renderMarkup = function (photos) {
  let markup = photos
    .map(photo => {
      return `
      <a class="photo-link" href="${photo.largeImageURL}">
        <div class="photo-card">
        <img
          src="${photo.webformatURL}"
          alt="${photo.tags}"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item likes">
            <b>Likes</b>
            ${photo.likes}
          </p>
          <p class="info-item views">
            <b>Views</b>
            ${photo.views}
          </p>
          <p class="info-item comments">
            <b>Comments</b>
            ${photo.comments}
          </p>
          <p class="info-item downloads">
            <b>Downloads</b>
            ${photo.downloads}
          </p>
        </div>
      </div>
      </a>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
};

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

const loadGalleryItems = function (evt) {
  evt.preventDefault();

  refs.loadMoreBtn.classList.add('visually-hidden');

  searchQuery = refs.searchInput.value.trim();

  page = 1;

  if (page === 1) {
    clearGallery();
  }

  fetchPhotos(searchQuery, page)
    .then(photos => {
      if (photos.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (photos.totalHits > 40) {
        renderMarkup(photos.hits);
        refs.loadMoreBtn.classList.remove('visually-hidden');

        cardsOnPage = document.querySelectorAll('.photo-card').length;

        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      } else {
        renderMarkup(photos.hits);

        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      }
    })
    .catch(error => console.log(error));
};

const loadMoreGalleryItems = function () {
  page += 1;

  searchQuery = refs.searchInput.value;

  cardsOnPage += document.querySelectorAll('.photo-card').length;

  fetchPhotos(searchQuery, page)
    .then(photos => {
      if (cardsOnPage < photos.totalHits) {
        renderMarkup(photos.hits);
      } else {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.classList.add('visually-hidden');
      }
    })
    .catch(error => console.log(error));
};

refs.searchBtn.addEventListener('click', loadGalleryItems);
refs.loadMoreBtn.addEventListener('click', loadMoreGalleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: false,
  showCounter: false,
});

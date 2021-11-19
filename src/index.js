import './css/style.css';
import GalleryPixabayApi from './api/pixabay-api';
import createImagesMarkup from './api/images-markup';
import LoadMoreBtn from './api/load-more';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fixedform from './js/form-fixed';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const totalHits = 500;
const notification = {
  tryAgain: 'Sorry, there are no images matching your search query. Please try again.',
  endOfSearchResults: "We're sorry, but you've reached the end of search results.",
  emptyString: 'Please, type your search query',
};

const galleryPixabayApi = new GalleryPixabayApi();
const lightBox = new SimpleLightbox('.gallery a');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

fixedform();
refs.searchForm.addEventListener('submit', requestImages);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function requestImages(e) {
  e.preventDefault();

  galleryPixabayApi.query = e.currentTarget.elements.searchQuery.value.trim();

  if (galleryPixabayApi.query === '') {
    loadMoreBtn.hide();
    clearGallery();
    return Notify.info(notification.emptyString);
  }

  galleryPixabayApi.resetPage();
  clearGallery();

  fetchImages();
}

function fetchImages() {
  loadMoreBtn.hide();

  galleryPixabayApi.fetchImages().then(images => {
    renderCards(images.data.hits);
    lightBoxGallery();
    findTotalHits(images.data.totalHits);
    loadMoreBtn.show();
    isEmptyGalleryString(images.data.hits);
    isEndGalleryString();
  });
}

function renderCards(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function isEmptyGalleryString(string) {
  if (string.length === 0) {
    loadMoreBtn.hide();
    Notify.failure(notification.tryAgain);
  }
}

function isEndGalleryString() {
  if (refs.gallery.children.length >= totalHits) {
    loadMoreBtn.hide();
    Notify.failure(notification.endOfSearchResults);
  }
  if (refs.gallery.children.length > 40) {
    addSmoothScroll();
  }
}

function findTotalHits(totalHits) {
  if (totalHits > 0) {
    return Notify.info(`Hooray! We found ${totalHits} images.`);
  }
}

function lightBoxGallery() {
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function addSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

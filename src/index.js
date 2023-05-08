import { renderGallery } from './js/render-markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const searchResult = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

const link = 'https://pixabay.com/api/';
const KEY = '36043083-bbc675b79bda412dd952998c9';
const params =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page = 1;
let query = '';
loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
searchResult.addEventListener('click', onClickImage);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;

  if (!query) {
    return;
  }
  const data = await fetchPhoto();
  searchResult.innerHTML = '';
  console.log(data);
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (data.total > 0) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    renderGallery(data);
    lightbox.refresh();
  }
}

async function onLoadMore() {
  page += 1;
  const data = await fetchPhoto();
  if (!data) return;
  renderGallery(data);
  lightbox.refresh();

  window.scrollBy({
    top: 540,
    behavior: 'smooth',
  });
}

function onClickImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

async function fetchPhoto() {
  const url = `${link}?key=${KEY}${params}&q=${query}&page=${page}`;
  try {
    const response = await axios.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

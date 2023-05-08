export { renderGallery };

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchResult = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;

function renderGallery(data) {
  let cards = '';

  data.hits.forEach(card => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = card;
    cards += `
      <a class="gallery__link" href="${largeImageURL}">
        <div class="gallery-item" >
          <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
        </div>
      </a>
    `;
  });
  searchResult.insertAdjacentHTML('beforeend', cards);

  if (data.hits.length < 40 || page === 13) {
    loadMoreBtn.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

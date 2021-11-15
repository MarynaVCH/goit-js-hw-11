import './css/style.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
};

refs.searchForm.addEventListener('submit', requestImages);

function requestImages(e) {
  e.preventDefault();
}

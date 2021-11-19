import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '24356647-347894b37411f301011a02fc0';

export default class GalleryPixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.pageSize = 40;
  }

  fetchImages() {
    const url = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=${this.pageSize}&page=${this.page}&orientation=horizontal&safesearch=true`;
    this.page += 1;
    return axios.get(url);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

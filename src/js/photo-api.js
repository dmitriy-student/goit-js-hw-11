export default class NewPhotoService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhoto() {
    const url = 'https://pixabay.com/api/';
    const params = `?key=36188192-df3cf63ec6f6149d9f5656270&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40&q=${this.searchQuery}`;

    fetch(url, params).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      this.incrementPage();
      return resp.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

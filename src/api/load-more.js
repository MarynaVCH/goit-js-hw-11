export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRef(selector);

    hidden && this.hide();
  }

  getRef(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);

    return refs;
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}

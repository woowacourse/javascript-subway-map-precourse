export default class Tab {
  #el
  #buttons
  #pages
  #views

  constructor(id, views) {
    this.#el = document.querySelector(`#tab-${id}`);
    this.#buttons = this.#el.querySelector('.tab-buttons');
    this.#pages = this.#el.querySelectorAll('.tab-page');
    this.#views = views

    if (this.#el.dataset.tabIndex) {
      this.show(this.#el.dataset.tabIndex);
    }

    this.#buttons.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return false;
      this.show(e.target.dataset.tabBtn);
    });
  }

  #hideAll() {
    const idx = this.#el.dataset.tabIndex;
    this.#pages.forEach(page => page.style.display = 'none');
  }

  show(tabNumber) {
    const page = this.#pages[tabNumber];
    const view = this.#views[tabNumber];

    this.#hideAll();
    page.style.display = 'block';
    view.el ? view.render() : view.init(page);
  }

}

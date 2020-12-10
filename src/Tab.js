export default class Tab {
  #el
  #buttons
  #pages

  constructor(id) {
    this.#el = document.querySelector(`#tab-${id}`);
    this.#buttons = this.#el.querySelector('.tab-buttons');
    this.#pages = this.#el.querySelectorAll('.tab-page');

    this.#hideAll()
    if (this.#el.dataset.tabIndex) {
      this.show(this.#el.dataset.tabIndex);
    }

    this.#buttons.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return false;
      this.show(e.target.dataset.tabBtn);
    });
  }

  #hideAll() {
    this.#pages.forEach(page => page.style.display = 'none');
  }

  show(tabNumber) {
    this.#hideAll();
    this.#pages[tabNumber].style.display = 'block';
  }

}

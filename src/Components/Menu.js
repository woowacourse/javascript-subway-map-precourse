class Menu {
  constructor({ $target, managerContainer }) {
    this.$target = $target;
    this.managerContainer = managerContainer;

    this.bindEvents();
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.nodeName !== `BUTTON`) return;
    this.managerContainer.mountDOM(target.id);
  }
}

export default Menu;

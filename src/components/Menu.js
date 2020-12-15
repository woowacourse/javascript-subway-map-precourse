export default class Menu {
  $el = null;
  $buttons = null;
  $pages = null;
  $views = null;

  constructor(views) {
    this.$el = document.querySelector("#menu");
    this.$buttons = this.$el.querySelector(".menu-buttons");
    this.$pages = this.$el.querySelectorAll(".menu-page");
    this.$views = views;
    this.$buttons.addEventListener("click", (e) => this.setButtonClick(e));
  }
  setButtonClick(event) {
    const { tagName, dataset } = event.target;
    if (tagName !== "BUTTON") {
      return;
    }
    this.show(dataset.menuIndex);
  }
  hideAll() {
    this.$pages.forEach((page) => (page.style.display = "none"));
  }
  show(menuNumber) {
    const page = this.$pages[menuNumber];
    const view = this.$views[menuNumber];
    this.hideAll();
    page.style.display = "block";
    view.init(page);
  }
}

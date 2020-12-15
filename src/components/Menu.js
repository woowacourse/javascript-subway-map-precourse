export default class Menu {
  $el = null;
  $buttons = null;
  $pages = null;

  constructor() {
    this.$el = document.querySelector("#menu");
    this.$buttons = this.$el.querySelector(".menu-buttons");
    this.$pages = this.$el.querySelectorAll(".menu-page");
    this.$buttons.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return false;
      this.show(e.target.dataset.menuIndex);
    });
  }
  hideAll() {
    this.$pages.forEach((page) => (page.style.display = "none"));
  }
  show(menuNumber) {
    const page = this.$pages[menuNumber];
    this.hideAll();
    page.style.display = "block";
  }
}

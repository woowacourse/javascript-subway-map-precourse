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

  show(menuNumber) {
    console.log(this.$pages, menuNumber);
    const page = this.$pages[menuNumber];
    page.style.display = "block";
  }
}

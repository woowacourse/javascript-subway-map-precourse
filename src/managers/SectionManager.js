import {
  rendLineSelectDom,
  clearMangeContainer,
  rendSectionAddDom,
} from "../views/domController.js";

export default class SectionManager {
  render() {
    clearMangeContainer();
    rendLineSelectDom();
    this.initEvent();
  }

  initEvent() {
    document.querySelectorAll(".section-line-menu-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        rendSectionAddDom(event.target);
      });
    });
  }
}

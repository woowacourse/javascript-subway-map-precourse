import { handleMenuClick } from "./menu.js";
class ManageSubwayLine {
  constructor() {
    this.reset();
  }

  resetDisplay = () => {
    const container = document.getElementsByClassName("content");
    for (let i = 0; i < container.length; i++) {
      container[i].style.display = "none";
    }
  };

  reset = () => {
    this.resetDisplay();
    handleMenuClick();
  };
}

new ManageSubwayLine();

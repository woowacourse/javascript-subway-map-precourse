import {
  rendLineMangeDom,
  clearMangeContainer,
  addLine,
} from "../views/domController.js";

export default class LineManager {
  constructor() {
    this.lines = localStorage.getItem("lines") || [];
  }

  render() {
    clearMangeContainer();
    rendLineMangeDom();
    this.initEvent();
  }

  initEvent() {
    document.getElementById("line-add-button").addEventListener("click", () => {
      addLine();
    });
  }
}

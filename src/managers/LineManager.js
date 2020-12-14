import {
  rendLineMangeDom,
  clearMangeContainer,
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

  initEvent() {}
}

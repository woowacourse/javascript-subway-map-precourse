import { clearMangeContainer } from "../views/domController.js";
import { lineMangeContainer } from "../views/dom.js";
import Line from "../components/Line.js";
import { addLocalStorageByKey, deleteDataByName } from "../utils/util.js";
import { addLineValidate } from "../utils/validator.js";
import { LINE, DELETE_CONFIRM_MESSAGE } from "../constants.js";

export default class LineManager {
  constructor() {
    this.lines = localStorage.getItem("lines") || [];
  }

  confirmLineDelete(targetElem) {
    try {
      deleteDataByName("lines", targetElem.dataset.index, "lineName");
      this.rendLineMangeDom();
    } catch (e) {}
  }

  setLineDeleteEvent() {
    document.querySelectorAll(".line-delete-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm(DELETE_CONFIRM_MESSAGE))
          this.confirmLineDelete(event.target);
      });
    });
  }

  addLine() {
    const lineNameElem = document.getElementById("line-name-input");
    const startStation = document.getElementById("line-start-station-selector")
      .value;
    const endStation = document.getElementById("line-end-station-selector")
      .value;
    const newLine = new Line(lineNameElem.value, startStation, endStation);
    if (addLineValidate(lineNameElem.value, startStation, endStation)) {
      addLocalStorageByKey("lines", newLine);
      this.rendLineMangeDom();
    } else {
      alert(LINE.INPUT_ERROR_MESSAGE);
    }
    lineNameElem.value = "";
  }

  rendLineMangeDom = () => {
    clearMangeContainer();
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.innerHTML = lineMangeContainer();
    container.appendChild(div);
    this.setLineDeleteEvent();
    this.initEvent();
  };

  initEvent() {
    document.getElementById("line-add-button").addEventListener("click", () => {
      this.addLine();
    });
  }

  render() {
    this.rendLineMangeDom();
    this.initEvent();
  }
}

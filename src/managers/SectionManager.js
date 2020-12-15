import {
  clearMangeContainer,
  selectLineContainer,
  sectionManageContainer,
} from "../views/dom.js";
import { addSection, deleteSection } from "../utils/sectionUtil.js";
import {
  addSectionValidate,
  deleteSectionValidate,
} from "../utils/validator.js";
import { SECTION, DELETE_CONFIRM_MESSAGE } from "../constants.js";

export default class SectionManager {
  insertSectionTable(targetElem) {
    const lineName = targetElem.dataset.name;
    const order = document.getElementById("section-order-input").value;
    const station = document.getElementById("section-station-selector").value;
    try {
      if (addSectionValidate(parseInt(order), station, lineName)) {
        addSection(order, station, lineName);
        this.rendSectionAddDom(lineName);
      } else {
        alert(SECTION.INPUT_ERROR_MESSAGE);
      }
    } catch (e) {}
  }

  confirmSectionDelete(targetElem) {
    const lineName = targetElem.dataset.name;
    try {
      if (deleteSectionValidate(targetElem)) {
        deleteSection(targetElem.dataset.index, lineName);
        this.rendSectionAddDom(lineName);
      } else {
        alert(SECTION.DELETE_ERROR_MESSAGE);
      }
    } catch (e) {}
  }

  setSectionEvent() {
    document.querySelectorAll(".section-delete-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        if (confirm(DELETE_CONFIRM_MESSAGE))
          this.confirmSectionDelete(event.target);
      });
    });

    document
      .getElementById("section-add-button")
      .addEventListener("click", (event) => {
        this.insertSectionTable(event.target);
      });
  }

  rendSectionAddDom(lineName) {
    clearMangeContainer();
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.setAttribute("id", "section-table");
    div.innerHTML = sectionManageContainer(lineName);
    container.appendChild(div);
    this.setSectionEvent();
  }

  initEvent() {
    document.querySelectorAll(".section-line-menu-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        this.rendSectionAddDom(event.target.dataset.index);
      });
    });
  }

  rendLineSelectDom() {
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.innerHTML = selectLineContainer();
    container.appendChild(div);
  }

  render() {
    clearMangeContainer();
    this.rendLineSelectDom();
    this.initEvent();
  }
}

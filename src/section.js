import Station from "./station.js";
import Line from "./line.js";
import {
  createCustomElement,
  createSelect,
  createTable,
  createTr,
  createValueTd,
  createButtonTd,
} from "./table.js";
class Section {
  constructor() {
    this.stations = Station.stations;
    this.lines = Line.lines;
    this.lineName = [];
    this.showMenuButton();
    this.resetSection();
  }

  resetSection = () => {
    const sectionInput = document.getElementById("sect-main-contents");
    sectionInput.style.display = "none";
    this.showStationSelect();
  };

  showStationSelect = () => {
    const select = document.getElementById("section-station-select");
    createSelect(select, this.stations);
  };

  createSectionTable = () => {
    const table = createTable(["순서", "이름", "설정"]);
    const lineStations = this.lines[this.lineName];
    for (let i = 0; i < lineStations.length; i++) {
      const tr = createTr([
        createValueTd(i.toString()),
        createValueTd(lineStations[i]),
        createButtonTd("노선에서 제거", "section-delete-button"),
      ]);
      table.appendChild(tr);
    }

    return table;
  };

  showSectionTable = () => {
    const sectionTable = this.createSectionTable();
    const sectionTableContainer = document.getElementById("sect-main-list");
    sectionTableContainer.innerHTML = "";
    sectionTableContainer.appendChild(sectionTable);

    this.handleAddStationSection();
  };

  showMenuButton = () => {
    const sectionMenuContainer = document.getElementById("sect-menus");
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const button = document.createElement("button");
      button.innerHTML = Object.keys(this.lines)[i];
      button.className = "section-line-menu-button";
      sectionMenuContainer.appendChild(button);
    }

    this.handleMenuButton();
  };

  showSectionInput = () => {
    const sectionName = document.querySelector(".sect-main h2");
    sectionName.innerHTML = `${this.lineName} 관리`;

    const sectionInput = document.getElementById("sect-main-contents");
    sectionInput.style.display = "block";
  };

  showSectionLine = e => {
    this.lineName = e.target.innerHTML;
    this.showSectionInput();
    this.showSectionTable();
  };

  handleMenuButton = () => {
    const sectionMenuBtns = document.getElementsByClassName(
      "section-line-menu-button"
    );
    for (let i = 0; i < sectionMenuBtns.length; i++) {
      sectionMenuBtns[i].addEventListener("click", this.showSectionLine);
    }
  };

  handleAddStationSection = () => {
    const button = document.getElementById("section-add-button");
    button.addEventListener("click", this.addSationSection);
  };
}

export default new Section();

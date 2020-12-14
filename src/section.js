import Storage from "./storage.js";
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
    this.stations = Storage.loadItems("station");
    this.lines = Storage.loadItems("line");
    this.lineName = null;
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
    this.handleDeleteStationSection();
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

  checkSectionVaild = (station, index) => {
    return (
      index.length > 0 &&
      index >= 0 &&
      index < Line.lines[this.lineName].length &&
      !Line.lines[this.lineName].includes(station)
    );
  };

  addStationSection = () => {
    const station = document.getElementById("section-station-select").value;
    const index = document.getElementById("section-order-input").value;
    if (this.checkSectionVaild(station, index)) {
      Line.lines[this.lineName].splice(index, 0, station);
      Storage.saveItems("line");
      this.showSectionTable();
    } else {
      alert("이미 노선에 존재하는 역이거나 잘못된 순서값 입니다");
    }
    document.getElementById("section-order-input").value = "";
  };

  deleteStationSection = e => {
    const removeIndex = e.target.parentNode.parentNode.querySelector("td")
      .innerHTML;
    if (Line.lines[this.lineName].length > 2) {
      Line.lines[this.lineName].splice(removeIndex, 1);
      Storage.saveItems("line");
      this.showSectionTable();
    } else {
      alert("노선에는 최소 상행종점, 하행종점 두개의 역이 존재해야 합니다");
    }
  };

  handleAddStationSection = () => {
    const button = document.getElementById("section-add-button");
    button.addEventListener("click", this.addStationSection);
  };

  handleDeleteStationSection = () => {
    const buttons = document.getElementsByClassName("section-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.deleteStationSection);
    }
  };
}

export default Section;

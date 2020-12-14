import Storage from "./storage.js";
import {
  createCustomElement,
  createTable,
  createTr,
  createButton,
} from "./table.js";
class Section {
  constructor() {
    this.stations = [];
    this.lines = {};
    this.lineName = null;
    this.refreshSection();
  }

  refreshSection = () => {
    this.stations = Storage.loadItems("station");
    this.lines = Storage.loadItems("line");
    this.showStationSelect();
    this.showMenuButton();
    this.resetSectionContainer();
  };

  resetSectionContainer = () => {
    const sectionInput = document.getElementById("sect-main");
    sectionInput.style.display = "none";
  };

  showStationSelect = () => {
    const selectContainer = document.getElementById("section-station-select");
    Storage.createStationSelect(selectContainer);
  };

  createSectionTable = () => {
    const table = createTable(["순서", "이름", "설정"]);
    const selectedLine = this.lines[this.lineName];
    for (let i = 0; i < selectedLine.length; i++) {
      const deleteBtn = createButton("노선에서 제거", "section-delete-button");
      const tr = createTr([
        createCustomElement({ tag: "td", innerHTML: i.toString() }),
        createCustomElement({ tag: "td", innerHTML: selectedLine[i] }),
        createCustomElement({ tag: "td", toAppend: deleteBtn }),
      ]);
      table.appendChild(tr);
    }

    return table;
  };

  checkSectionVaild = (station, index) => {
    return (
      index.length > 0 &&
      index >= 0 &&
      index < this.lines[this.lineName].length &&
      !this.lines[this.lineName].includes(station)
    );
  };

  addStationSection = () => {
    const station = document.getElementById("section-station-select").value;
    const index = document.getElementById("section-order-input").value;
    if (this.checkSectionVaild(station, index)) {
      this.lines[this.lineName].splice(index, 0, station);
      Storage.saveItems("line", this.lines);
      this.showSectionTable();
    } else {
      alert("이미 노선에 존재하는 역이거나 잘못된 순서값 입니다");
    }
    document.getElementById("section-order-input").value = "";
  };

  deleteStationSection = e => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    const removeIndex = e.target.parentNode.parentNode.querySelector("td")
      .innerHTML;
    if (this.lines[this.lineName].length > 2) {
      this.lines[this.lineName].splice(removeIndex, 1);
      Storage.saveItems("line", this.lines);
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

  showSectionInput = () => {
    const sectionInput = document.getElementById("sect-main");
    const sectionName = sectionInput.querySelector("h2");
    sectionInput.style.display = "block";
    sectionName.innerHTML = `${this.lineName} 관리`;

    this.handleAddStationSection();
  };

  showSectionTable = () => {
    const sectionTableContainer = document.getElementById("sect-main-list");
    sectionTableContainer.innerHTML = "";
    sectionTableContainer.appendChild(this.createSectionTable());

    //this.handleAddStationSection();
    this.handleDeleteStationSection();
  };

  showSectionLine = e => {
    this.lineName = e.target.innerHTML;
    this.showSectionInput();
    this.showSectionTable();
  };

  // 메뉴 버튼 메서드
  handleMenuButton = () => {
    const sectionMenuBtns = document.getElementsByClassName(
      "section-line-menu-button"
    );
    for (let i = 0; i < sectionMenuBtns.length; i++) {
      sectionMenuBtns[i].addEventListener("click", this.showSectionLine);
    }
  };

  showMenuButton = () => {
    const sectionMenuContainer = document.getElementById("sect-menus");
    sectionMenuContainer.innerHTML = "";
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      sectionMenuContainer.appendChild(
        createButton(Object.keys(this.lines)[i], "section-line-menu-button")
      );
    }

    this.handleMenuButton();
  };
}

export default new Section();

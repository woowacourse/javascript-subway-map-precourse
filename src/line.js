import Storage from "./storage.js";
import {
  createCustomElement,
  createTable,
  createTr,
  createButton,
} from "./table.js";

class Line {
  constructor() {
    this.stations = [];
    this.lines = {};
    this.refreshLine();
    this.handleAddLineClick();
  }

  refreshLine = () => {
    console.log("Re");
    this.stations = Storage.loadItems("station");
    this.lines = Storage.loadItems("line");
    this.showStationSelect();
    this.showLines();
  };

  showStationSelect = () => {
    const upLineSelect = document.getElementById("line-start-station-selector");
    const downLineSelect = document.getElementById("line-end-station-selector");
    Storage.createStationSelect(upLineSelect);
    Storage.createStationSelect(downLineSelect);
  };

  createLineTr = i => {
    const line = this.lines[Object.keys(this.lines)[i]];
    const deleteBtn = createButton("삭제", "line-delete-button");
    const tr = createTr([
      createCustomElement({ tag: "td", innerHTML: Object.keys(this.lines)[i] }),
      createCustomElement({ tag: "td", innerHTML: line[0] }),
      createCustomElement({ tag: "td", innerHTML: line[line.length - 1] }),
      createCustomElement({ tag: "td", toAppend: deleteBtn }),
    ]);

    return tr;
  };

  createLineTable = () => {
    const table = createTable(["노선이름", "상행종점역", "하행종점역", "설정"]);
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      table.appendChild(this.createLineTr(i));
    }

    return table;
  };

  showLines = () => {
    const lineContainer = document.querySelector(".line-list");
    const lineTable = this.createLineTable();
    lineContainer.innerHTML = "";
    lineContainer.appendChild(lineTable);

    this.handleDeleteLineClick();
  };

  checkLineVaild = (lineName, upStation, downStation) => {
    return (
      lineName &&
      upStation &&
      downStation &&
      lineName.length > 0 &&
      !this.lines.hasOwnProperty(lineName)
    );
  };

  getLineInput = () => {
    const lineName = document.getElementById("line-name-input").value;
    const upStation = document.getElementById("line-start-station-selector")
      .value;
    const downStation = document.getElementById("line-end-station-selector")
      .value;

    document.getElementById("line-name-input").value = "";
    return { lineName, upStation, downStation };
  };

  addLine = () => {
    const { lineName, upStation, downStation } = this.getLineInput();
    console.log(lineName, upStation, downStation, "Sd");
    if (this.checkLineVaild(lineName, upStation, downStation)) {
      this.lines[lineName] = [upStation, downStation];
      Storage.saveItems("line", this.lines);
      this.showLines();
    } else {
      alert("노선 이름이 없거나 중복된 노선 이름입니다");
    }
  };

  deleteLine = e => {
    const removeNode = e.target.parentNode.parentNode;
    const removeName = removeNode.querySelector("td").innerHTML;
    delete this.lines[removeName];

    Storage.saveItems("line", this.lines);
    this.showLines();
  };

  handleAddLineClick = () => {
    const lineAddBtn = document.getElementById("line-add-button");
    lineAddBtn.addEventListener("click", this.addLine);
  };

  handleDeleteLineClick = () => {
    const lineDeleteBtn = document.getElementsByClassName("line-delete-button");
    for (let i = 0; i < lineDeleteBtn.length; i++) {
      lineDeleteBtn[i].addEventListener("click", this.deleteLine);
    }
  };
}

export default new Line();

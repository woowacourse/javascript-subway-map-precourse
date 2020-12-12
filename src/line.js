import Station from "./station.js";
import {
  createTable,
  createTr,
  createValueTd,
  createButtonTd,
  createSelect,
} from "./table.js";

class Line {
  constructor() {
    this.stations = Station.stations;
    this.lines = {};
    this.showStationSelect();
    this.handleAddLineClick();
    this.loadLines();
  }

  saveLines = () => {
    localStorage.setItem("lines", JSON.stringify(this.lines));
  };

  loadLines = () => {
    const lines = localStorage.getItem("lines");
    if (lines !== null) {
      this.lines = JSON.parse(lines);
    }

    this.showLines();
  };

  showStationSelect = () => {
    const upLineSelect = document.getElementById("line-start-station-selector");
    const downLineSelect = document.getElementById("line-end-station-selector");
    createSelect(upLineSelect, this.stations);
    createSelect(downLineSelect, this.stations);
  };

  createLineTable = () => {
    const table = createTable(["노선이름", "상행종점역", "하행종점역", "설정"]);
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const name = Object.keys(this.lines)[i];
      const tr = createTr([
        createValueTd(name),
        createValueTd(this.lines[name][0]),
        createValueTd(this.lines[name][this.lines[name].length - 1]),
        createButtonTd("삭제", "line-delete-button"),
      ]);
      table.appendChild(tr);
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

  checkLineVaild = lineName => {
    // 라인 이름이 중복되는 이름이 검증한다
    return lineName.length > 0 && !this.lines.hasOwnProperty(lineName);
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
    if (this.checkLineVaild(lineName)) {
      this.lines[lineName] = [upStation, downStation];
      this.saveLines();
      this.showLines();
    } else {
      alert("중복된 노선 이름입니다");
    }
  };

  deleteLine = e => {
    const removeNode = e.target.parentNode.parentNode;
    const removeName = removeNode.querySelector("td").innerHTML;
    delete this.lines[removeName];

    this.saveLines();
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

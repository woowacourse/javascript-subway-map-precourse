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
  }

  showStationSelect = () => {
    const upLineSelect = document.getElementById("line-start-station-selector");
    const downLineSelect = document.getElementById("line-end-station-selector");
    createSelect(upLineSelect, this.stations);
    createSelect(downLineSelect, this.stations);
  };

  createLineTable = () => {
    const table = createTable(["노선이름", "상행종점역", "하행종점역", "설정"]);
    for (let i = 0; i < Object.keys(this.lines).length; i++) {
      const tr = createTr([
        createValueTd(Object.keys(this.lines)[i]),
        createValueTd(this.lines[Object.keys(this.lines)[i]][0]),
        createValueTd(this.lines[Object.keys(this.lines)[i]][1]),
        createButtonTd("삭제", "line-delete-button"),
      ]);
      tr.dataset.index = i;
      table.appendChild(tr);
    }

    return table;
  };

  showLines = () => {
    const linenContainer = document.querySelector(".line-list");
    const lineTable = this.createLineTable();
    linenContainer.innerHTML = "";
    linenContainer.appendChild(lineTable);

    this.handleDeleteLineClick();
  };

  checkLineVaild = lineName => {
    // 라인 이름이 중복되는 이름이 검증한다
    return lineName.length > 0 && !this.lines.hasOwnProperty(lineName);
  };

  addLine = () => {
    const lineName = document.getElementById("line-name-input").value;
    const upStation = document.getElementById("line-start-station-selector")
      .value;
    const downStation = document.getElementById("line-end-station-selector")
      .value;
    if (this.checkLineVaild(lineName)) {
      this.lines[lineName] = [upStation, downStation];
      this.showLines();
    } else {
      alert("중복된 노선 이름입니다");
    }
  };

  handleAddLineClick = () => {
    const lineAddBtn = document.getElementById("line-add-button");
    lineAddBtn.addEventListener("click", this.addLine);
  };
}

export default new Line();

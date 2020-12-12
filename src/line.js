import Station from "./station.js";
import { createSelect } from "./table.js";

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

  addLine = () => {
    const lineName = document.getElementById("line-name-input").value;
    const upStation = document.getElementById("line-start-station-selector")
      .value;
    const downStation = document.getElementById("line-end-station-selector")
      .value;
    if (this.checkLineVaild(lineName)) {
      this.lines[lineName] = [upStation, downStation];
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

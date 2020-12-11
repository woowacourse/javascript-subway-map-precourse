import { createTable, createTr, createValueTd } from "./table.js";
class Station {
  constructor() {
    this.stations = [];
    this.handleAddNameClick();
  }

  createStationTable = () => {
    const stationTable = createTable(["역 이름", "설정"]);
    for (let i = 0; i < this.stations.length; i++) {
      const tr = createTr([
        createValueTd(this.stations[i]),
        createButtonTd("삭제", "station-delete-button"),
      ]);
      tr.dataset.index = i;
      stationTable.appendChild(tr);
    }

    return stationTable;
  };

  showStation = () => {
    const stationContainer = document.querySelector(".station-list");
    const stationTable = this.createStationTable();
    stationContainer.innerHTML = "";
    stationContainer.appendChild(stationTable);

    this.handleDeleteNameClick();
  };

  checkVaildName = name => {
    // 주어진 역이름이 2글자이상이고 중복 아니면 true
    return name.length >= 2 && !this.stations.includes(name);
  };

  getNameInput = () => {
    const station = document.getElementById("station-name-input").value;
    document.getElementById("station-name-input").value = "";

    return station;
  };

  addStation = () => {
    const name = this.getNameInput();
    if (this.checkVaildName(name)) {
      this.stations.push(name);
      this.showStation();
    } else {
      alert("잘못된 역 이름입니다");
    }
  };

  handleAddNameClick = () => {
    const stationAddBtn = document.getElementById("station-add-button");
    stationAddBtn.addEventListener("click", this.addStation);
  };
}

export default Station;

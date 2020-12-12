import {
  createTable,
  createTr,
  createValueTd,
  createButtonTd,
} from "./table.js";
class Station {
  constructor() {
    this.stations = [];
    this.handleAddNameClick();
  }

  saveStation = () => {
    localStorage.setItem("stations", this.stations);
  };

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

  deleteStation = e => {
    const removeNode = e.target.parentNode.parentNode;
    const removeIndex = removeNode.dataset.index;
    for (let i = 0; i < this.stations.length; i++) {
      if (i === parseInt(removeIndex)) {
        this.stations.splice(i, 1);
      }
    }
    this.showStation();
  };

  handleAddNameClick = () => {
    const stationAddBtn = document.getElementById("station-add-button");
    stationAddBtn.addEventListener("click", this.addStation);
  };

  handleDeleteNameClick = () => {
    const stationDeleteBtn = document.getElementsByClassName(
      "station-delete-button"
    );
    for (let i = 0; i < stationDeleteBtn.length; i++) {
      stationDeleteBtn[i].addEventListener("click", this.deleteStation);
    }
  };
}

export default Station;

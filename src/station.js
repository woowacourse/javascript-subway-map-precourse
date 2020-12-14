import Storage from "./storage.js";
import {
  createCustomElement,
  createTable,
  createTr,
  createButton,
} from "./table.js";
class Station {
  constructor() {
    this.stations = [];
    this.refreshStation();
    this.handleAddNameClick();
  }

  refreshStation = () => {
    this.stations = Storage.loadItems("station");
    this.showStation();
  };

  createStationTable = () => {
    const stationTable = createTable(["역 이름", "설정"]);

    for (let i = 0; i < this.stations.length; i++) {
      const deleteBtn = createButton("삭제", "station-delete-button");
      const tr = createTr([
        createCustomElement({ tag: "td", innerHTML: this.stations[i] }),
        createCustomElement({ tag: "td", toAppend: deleteBtn }),
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
      Storage.saveItems("station", this.stations);
      this.showStation();
    } else {
      console.log(name);
      alert("잘못된 역 이름입니다");
    }
  };

  deleteStation = e => {
    if (!confirm("정말로 역을 삭제하시겠습니까?")) return;

    const removeNode = e.target.parentNode.parentNode;
    const removeIndex = removeNode.dataset.index;
    for (let i = 0; i < this.stations.length; i++) {
      if (i === parseInt(removeIndex)) {
        this.stations.splice(i, 1);
      }
    }

    Storage.saveItems("station", this.stations);
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

export default new Station();

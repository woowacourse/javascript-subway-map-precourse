import station from "./station.js";
import { createStationTableRowHTML } from "./template.js";

export default class StationManager {
  constructor() {
    this.station = station;
  }

  renderStationTable() {
    const allStations = this.station.getAllStations();

    const stationTableHTML = allStations.reduce((stationRowHTML, stationName) => {
      stationRowHTML += createStationTableRowHTML(stationName);
      return stationRowHTML;
    }, "");

    document.getElementById("station-table").querySelector("tbody").innerHTML = stationTableHTML;
  }

  getStationNameInput() {
    const stationNameInputField = document.getElementById("station-name-input"); //dom
    const stationName = stationNameInputField.value;

    return stationName;
  }

  addStation() {
    const stationName = this.getStationNameInput();
    //입력값 검사
    //등록
    //뷰추가
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "station-add-button") {
      this.addStation();
    }
  }
}

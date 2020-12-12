import { isSatisfyLength, isStationAlreadyExist, isStationOnLine } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Station() {
  const stationPage = document.getElementById("station-page");
  const stationTable = document.getElementById("station-table");
  let lines;
  this.stations = [
    "인천",
    "동인천",
    "도원",
    "소요산",
    "사당",
    "시청",
    "신도림",
    "대화",
    "오금",
    "오이도",
    "당고개",
  ];
  this.count = this.stations.length;

  this.init = (lineList) => {
    lines = lineList; // Line 클래스 인스턴스를 받아옴
    stationPage.style.display = "block";
    this.showStations();
    const stationDelBtns = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < stationDelBtns.length; i++) {
      stationDelBtns[i].addEventListener("click", (event) => this.deleteStation(event));
    }
    const stationInputBtn = document.getElementById("station-add-button");
    stationInputBtn.addEventListener("click", this.addStation);
  };

  this.showStations = () => {
    let newHTML = "";
    for (let i = 0; i < this.stations.length; i++) {
      newHTML += `
        <tr id="station${i}">
          <td><span>${this.stations[i]} </span></td>
          <td><button class="station-delete-button" id="${i}" value="${this.stations[i]}">삭제</button></td>
        </tr>`;
    }
    stationTable.insertAdjacentHTML("beforeend", newHTML);
  };

  this.addStation = () => {
    const stationInput = document.getElementById("station-name-input").value;
    if (!isSatisfyLength(stationInput)) {
      return alert(alertMessage.SHORT_LENGTH_ERROR);
    } else if (isStationAlreadyExist(this.stations, stationInput)) {
      return alert(alertMessage.SAME_STATION_EXIST_ERROR);
    }
    this.stations.push(stationInput);
    const newHTML = `
    <tr id="station${this.count}">
    <td><span>${stationInput}</span></td>
    <td><button class="station-delete-button" id="${this.count}">삭제</button></td></tr>`;
    stationTable.insertAdjacentHTML("beforeend", newHTML);
    const newStation = document.getElementById(`${this.count}`);
    newStation.addEventListener("click", (event) => this.deleteStation(event));
    this.count++;
  };

  this.deleteStation = (event) => {
    const targetId = event.target.id;
    const targetValue = event.target.value;
    const delStation = document.getElementById(`station${targetId}`);
    if (!confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
      return;
    }
    if (isStationOnLine(lines, targetValue)) {
      return alert(alertMessage.DELETE_STATION_ON_LINE_MESSAGE);
    }
    delStation.remove();
    this.stations.splice(this.stations.indexOf(targetValue), 1);
  };
}

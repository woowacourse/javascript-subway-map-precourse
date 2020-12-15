import renderStation from "../../render/renderStation.js";
import { isStationOnLine } from "../../common/checkInput.js";
import { alertMessage } from "../../common/alertMessage.js";

function delStation(station) {
  const lines = JSON.parse(localStorage.lines);
  const stations = JSON.parse(localStorage.stations);

  stations.splice(stations.indexOf(station), 1);

  if (isStationOnLine(lines, station)) {
    return alert(alertMessage.DELETE_STATION_ON_LINE_MESSAGE);
  }

  localStorage.stations = JSON.stringify(stations);

  renderStation();
}

function findDeleteTarget(event) {
  const $target = event.target;
  const $stationTable = document.getElementsByClassName("station-table-row");
  const targetNumber = $target.closest("tr").dataset.number;
  const station = $stationTable[targetNumber].querySelector("span").innerText;

  delStation(station);
}

export default function delStationEvent() {
  const $delStationBtn = document.querySelectorAll(".station-delete-button");
  $delStationBtn.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
        findDeleteTarget(event);
      }
    })
  );
}

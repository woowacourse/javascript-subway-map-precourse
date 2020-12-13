import renderStation from "../../render/renderStation.js";
import { alertMessage } from "../../alertMessage.js";

function delStation(station) {
  const stations = JSON.parse(localStorage.stations);
  stations.splice(stations.indexOf(station), 1);

  localStorage.stations = JSON.stringify(stations);

  renderStation();
}

function findRemoveTarget(event) {
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
        findRemoveTarget(event);
      }
    })
  );
}

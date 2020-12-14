import delStationEvent from "../event/station/delStationEvent.js";

function stationTableTemplate() {
  return `<table class="station-table" border="1">
            <tr>
              <th>역 이름</th>
              <th>설정</th>
            </tr>
          </table>`;
}

function initStationListContainer() {
  const $stationTableContainer = document.getElementById("station-table-container");
  $stationTableContainer.innerHTML = stationTableTemplate();
}

function stationListTemplate(station, stationNumber) {
  return `<tr class="station-table-row"data-number=${stationNumber}>
            <td>
              <span>${station}</span>
            </td>
            <td>
              <button class="station-delete-button">삭제</button>
            </td>
          </tr>`;
}

function initStationList(stations) {
  const $stationTable = document.querySelector(".station-table");
  let stationNumber = 0;

  stations.forEach((station) =>
    $stationTable.insertAdjacentHTML("beforeend", stationListTemplate(station, stationNumber++))
  );

  delStationEvent();
}

export default function renderStation() {
  initStationListContainer();

  const stations = JSON.parse(localStorage.stations);
  if (stations !== null) {
    initStationList(stations);
  }
}

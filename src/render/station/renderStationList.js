import removeStationEvent from '../../event/station/removeStationEvent.js';

function stationListContainerTemplate() {
  return `<table class="station-table" border="1">
                <tr>
                <th>역 이름</th>
                <th>설정</th>
                </tr>
            </table>`;
}

function initStationListContainer() {
  const $stationTableContainer = document.querySelector(
    '.station-table-container',
  );
  $stationTableContainer.innerHTML = stationListContainerTemplate();
}

function stationListTemplate(station, stationNumber) {
  return `<tr class="station-table-child" data-number=${stationNumber}>
            <td data-number=${stationNumber}>
              <span>${station}</span>
            </td>
            <td data-number=${stationNumber}>
              <button class="station-delete-button">삭제</button>
            </td>
          </tr>`;
}

function initStationList(stations) {
  const $stationTable = document.querySelector('.station-table');
  let stationNumber = 0;

  stations
    .split(' ')
    .forEach((station) =>
      $stationTable.insertAdjacentHTML(
        'beforeend',
        stationListTemplate(station, stationNumber++),
      ),
    );
  removeStationEvent();
}

export default function renderStationList() {
  initStationListContainer();

  const stations = JSON.parse(String(localStorage.getItem('stations')));
  if (stations !== null) {
    initStationList(stations);
  }
}

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

function stationListTemplate(station) {
  return `<tr class="station-table-child">
            <td>${station}</td>
            <td><button class="station-delete-button">삭제</button></td>
          </tr>`;
}

function initStationList(stations) {
  const $stationTable = document.querySelector('.station-table');

  stations
    .split(' ')
    .forEach((station) =>
      $stationTable.insertAdjacentHTML(
        'beforeend',
        stationListTemplate(station),
      ),
    );
}

export default function renderStationList() {
  initStationListContainer();

  const stations = JSON.parse(String(localStorage.getItem('stations')));

  if (stations !== null) {
    initStationList(stations);
  }
}

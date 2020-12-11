function stationListContainerTemplate() {
  return `<table class="station-table" border="1">
                <tr>
                <th>역 이름</th>
                <th>설정</th>
                </tr>
            </table>`;
}

function stationListTemplate(station) {
  return `<tr class="station-table-child">
              <td>${station}</td>
              <td><button class="station-delete-button">삭제</button></td>
          </tr>`;
}

function initStationList() {
  const $stationTableContainer = document.querySelector(
    '.station-table-container',
  );
  $stationTableContainer.innerHTML = stationListContainerTemplate();
}

export default function renderStationList() {
  initStationList();
  const $stationTable = document.querySelector('.station-table');
  const stations = JSON.parse(localStorage.getItem('stations')).toString();
  const stationList = stations.split(' ');

  stationList.forEach((station) =>
    $stationTable.insertAdjacentHTML('beforeend', stationListTemplate(station)),
  );
}

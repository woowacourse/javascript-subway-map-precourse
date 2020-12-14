const STATION_MANAGER_PAGE_TEMPLATE =
  '<p><strong>역 이름</strong></p>' +
  '<input type="text" id="station-name-input">' +
  '<button id="station-add-button">역 추가</button>' +
  '<div class="all-station-table">' +
  '<table border="1">' +
  '<h2>🚉 지하철 역 목록</h2>' +
  '<thead>' +
  '<tr>' +
  '<th>역 이름</th>' +
  '<th>설정</th>' +
  '</tr>' +
  '</thead>' +
  '<tbody class="station_manager_tbody">' +
  '</tbody>' +
  '</table>' +
  '</div>';

const STATION_TABLE_TEMPLATE = (stationName) => {
  return `<tr>
      <td>${stationName}</td>
      <td><button class=".station-delete-button">삭제</button></td>
      </tr>`;
};

export { STATION_MANAGER_PAGE_TEMPLATE, STATION_TABLE_TEMPLATE };

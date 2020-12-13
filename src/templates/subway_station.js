export const stationAddContainer = () => {
  return `<div>
    <div><strong>역 이름</strong></div>
    ${stationNameInput}
    ${stationAddButton}
  </div>`;
};

const stationNameInput =
  '<input id="station-name-input" placeholder="역 이름을 입력해주세요."></input>';
const stationAddButton = '<button id="station-add-button">역 추가</button>';

export const stationList = stations => {
  return `<div class="station-list">
    <h2>🚉지하철 역 목록</h2>
    ${stationTable(stations)}
  </div>`;
};

const stationTable = stations => {
  return `<table>
    ${stationTableHeader}
    ${stations
      .map(
        (station, idx) =>
          `<tr>${stationName(station.name)}${stationDeleteButton(idx)}</tr>`
      )
      .join('')}
  </table>`;
};

const stationTableHeader = '<tr><th>역 이름</th><th>설정</th></tr>';
const stationDeleteButton = idx => {
  return `<td>
    <button class="station-delete-button" data-item=${idx}>삭제</button>
  </td>`;
};

const stationName = name => {
  return `<td>${name}</td>`;
};

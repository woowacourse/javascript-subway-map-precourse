export const stationAddContainer = () => {
  return `<div>역 이름
    ${stationNameInput}
    ${stationAddButton}
  </div>`;
};

const stationNameInput = '<input id="station-name-input"></input>';
const stationAddButton = '<button id="station-add-button"></button>';

export const stationTable = stations => {
  `<table${stationTableHeader}
    ${stations.map(
      station => `<tr>${stationName(station.name)}${stationDeleteButton}</tr>`
    )}
  </table>`;
};

const stationTableHeader = '<tr><th>역 이름</th><th>설정</th></tr>';
const stationDeleteButton =
  '<td><button class="station-delete-button"></button></td>';

const stationName = name => {
  return `<td>${name}</td>`;
};

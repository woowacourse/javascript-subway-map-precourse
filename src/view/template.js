import { ID, CLASS } from '../constants/index.js';

export const stationManagerTemplate = () => {
  return `
    <h4>역 이름</h4>
    <input id='${ID.STATION_NAME_INPUT}'/>
    <button id='${ID.STATION_ADD_BUTTON}'>역 추가</button>
    `;
};

export const stationTableTemplate = (subways) => {
  return `
    <h2>🚉 지하철 역 목록</h2>
    <table border='1'>
    <th>역 이름</th>
    <th>설정</th>
    ${stationTable(subways)}
    </table>`;
};

const stationTable = (subways) => {
  let count = 0;
  return subways
    .map(
      (subway) =>
        `<tr>
        <td>${subway.station}</td>
        <td data-index='${count++}'>
          <button class='${CLASS.STATION_DELETE_BUTTON}'>삭제</button>
        </td>
        </tr>`
    )
    .join('');
};

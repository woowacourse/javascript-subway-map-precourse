import { ID, CLASS } from '../constants/index.js';

export const stationManagerTemplate = () => {
  return `
    <br><label>역 이름</label><br>
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

export const lineManagerTemplate = (subways) => {
  return `
    <br><label>노선 이름</label><br>
    <input id='${ID.LINE_NAME_INPUT}' /><br><br>
    <label>상행 종점</label><select id='${ID.LINE_START_STATION_SELECTOR}'>
      ${lineSelectorOption(subways)}
    </select><br>
    <label>하행 종점</label><select id='${ID.LINE_END_STATION_SELECTOR}'>
      ${lineSelectorOption(subways)} 
    </select><br><br>
    <button id='${ID.LINE_ADD_BUTTON}'>노선 추가</button>
    `;
};

const lineSelectorOption = (subways) => {
  return subways.map((subway) => `<option>${subway.station}</option>`).join('');
};

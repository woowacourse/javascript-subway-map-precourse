import { ID, CLASS, NAME } from '../constants/index.js';

export const functionButton = () => {
  return `
    <button id='${ID.STATION_MANAGER_BUTTON}'>${NAME.STATION_MANAGER_BUTTON_NAME}</button>
    <button id='${ID.LINE_MANAGER_BUTTON}'>${NAME.LINE_MANAGER_BUTTON_NAME}</button>
    <button id='${ID.SECTION_MANAGER_BUTTON}'>${NAME.SECTION_MANAGER_BUTTON_NAME}</button>
    `;
};

export const stationManagerTemplate = () => {
  return `
    <br><label>역 이름</label><br>
    <input id='${ID.STATION_NAME_INPUT}'/>
    <button id='${ID.STATION_ADD_BUTTON}'>역 추가</button>
    `;
};

export const stationTableTemplate = (stations) => {
  return `
    <h2>🚉 지하철 역 목록</h2>
    <table border='1'>
    <th>역 이름</th>
    <th>설정</th>
    ${stationTable(stations)}
    </table>`;
};

const stationTable = (stations) => {
  let count = 0;
  return stations
    .map(
      (station) =>
        `<tr>
        <td>${station.name}</td>
        <td data-index='${count++}'>
          <button class='${CLASS.STATION_DELETE_BUTTON}'>삭제</button>
        </td>
        </tr>`
    )
    .join('');
};

export const lineManagerTemplate = (stations) => {
  return `
    <br><label>노선 이름</label><br>
    <input id='${ID.LINE_NAME_INPUT}' /><br><br>
    <label>상행 종점</label><select id='${ID.LINE_START_STATION_SELECTOR}'>
      ${stationSelectorOption(stations)}
    </select><br>
    <label>하행 종점</label><select id='${ID.LINE_END_STATION_SELECTOR}'>
      ${stationSelectorOption(stations)} 
    </select><br><br>
    <button id='${ID.LINE_ADD_BUTTON}'>노선 추가</button>
    `;
};

const stationSelectorOption = (stations) => {
  return stations.map((station) => `<option>${station.name}</option>`).join('');
};

export const lineTableTemplate = (lines) => {
  return `
    <h2>🚉 지하철 노선 목록</h2>
    <table border='1'>
    <th>노선 이름</th>
    <th>상행 종점역</th>
    <th>하행 종점역</th>
    <th>설정</th>
    ${lineTable(lines)}
    </table>`;
};

const lineTable = (lines) => {
  let count = 0;
  return lines
    .map(
      (line) =>
        `<tr>
        <td>${line.name}</td>
        <td>${line.section[0]}</td>
        <td>${line.section[line.section.length - 1]}</td>
        <td data-index='${count++}'>
          <button class='${CLASS.LINE_DELETE_BUTTON}'>삭제</button>
        </td>
        </tr>`
    )
    .join('');
};

export const sectionLineMenuTemplate = (lines) => {
  return `
    <h2>구간을 수정할 노선을 선택해주세요.</h2>
    ${sectionLineMenuButton(lines)}
    `;
};

const sectionLineMenuButton = (lines) => {
  return lines
    .map(
      (line) => `
      <button class='${CLASS.SECTION_LINE_MENU_BUTTON}'>${line.name}</button>
      `
    )
    .join('');
};

export const sectionManagerTemplate = (line, stations) => {
  return `
    <h2>${line} 관리</h2>
    <h4>구간 등록</h4>
    <select id='${ID.SECTION_STATION_SELECTOR}'>${stationSelectorOption(stations)}</select>
    <input id='${ID.SECTION_ORDER_INPUT}' />
    <button id='${ID.SECTION_ADD_BUTTON}'>등록</button>
    `;
};

export const sectionTableTemplate = (sections) => {
  return `
  <br>
  <table border='1'>
  <th>순서</th>
  <th>이름</th>
  <th>설정</th>
  ${sectionTable(sections)}
  </table>
  `;
};

const sectionTable = (sections) => {
  let count = 0;
  return sections
    .map(
      (section) => `
      <tr>
        <td>${count++}</td>
        <td>${section}</td>
        <td><button class='${CLASS.SECTION_DELETE_BUTTON}'>노선에서 제거</button></td>
      </tr>`
    )
    .join('');
};

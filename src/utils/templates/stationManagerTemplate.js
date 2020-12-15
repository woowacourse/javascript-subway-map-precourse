import { CLASS } from "../constants/dom.js";

export const StationTableHeaderHTML = `
  <tr>
    <th>역 이름</th>
    <th>설정</th>
  </tr>
`;
export const createStationTableRowsHTML = names => {
  return names.reduce((html, name) => {
    html += TableRowHTML(name);
    return html;
  }, ``);
};

const TableRowHTML = name => {
  return `
  <tr>
    <td data-name="${name}">${name}</td>
    <td ><button class=${CLASS.STATION_DELETE_BUTTON}>삭제</button></td>
  </tr>
  `;
};

import { CLASS } from "../../utils/constants/dom.js";

export const createLineOptionsHTML = stations => {
  return stations.reduce((html, station) => {
    html += OptionHTML(station);
    return html;
  }, ``);
};

const OptionHTML = name => {
  return `
    <option value=${name}>${name}</option>
  `;
};

export const LineTableHeaderHTML = `
  <tr>
    <th>노선 이름</th>
    <th>상행 종점역</th>
    <th>하행 종점역</th>
    <th>설정</th>
  </tr>
`;

export const createLineTableRowsHTML = lines => {
  return lines.reduce((html, line) => {
    html += TableRowHTML([
      line.name,
      line.sections[0],
      line.sections[line.sections.length - 1],
    ]);
    return html;
  }, ``);
};

const TableRowHTML = names => {
  const [name, startStation, endStation] = names;
  return `
  <tr>
    <td data-name=${name}>${name}</td>
    <td>${startStation}</td>
    <td>${endStation}</td>
    <td><button class=${CLASS.LINE_DELETE_BUTTON}>노선에서 제거</button></td>
  </tr>
  `;
};

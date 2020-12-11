export const lineAddContainer = () => {
  return `<div>노선 이름
    ${lineNameInput}
    상행 종점${lineStartSelector}
    하행 종점${lineEndSelector}
    ${lineAddButton}
  </div>`;
};

const lineNameInput = '<input id="line-name-input"></input>';
const lineStartSelector = '<select id="line-start-station-selector"></select>';
const lineEndSelector = '<select id="line-end-station-selector"></select>';
const lineAddButton = '<button id="line-add-button"></button>';

export const lineTable = lines => {
  `<table${lineTableHeader}
    ${lines.map(
      line =>
        `<tr>
          ${lineName(line.name)}
          ${lineStartName(line.start)}
          ${lineEndName(line.end)}
          ${lineDeleteButton}
        </tr>`
    )}
  </table>`;
};

const lineTableHeader =
  '<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>';

const lineDeleteButton =
  '<td><button class="line-delete-button"></button></td>';

const lineName = name => {
  return `<td>${name}</td>`;
};

const lineStartName = name => {
  return `<td>${name}</td>`;
};

const lineEndName = name => {
  return `<td>${name}</td>`;
};

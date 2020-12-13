export const lineAddContainer = stations => {
  const options = stations
    .map(station => station.name)
    .map(name => {
      return `<option value=${name}>${name}</option>`;
    })
    .join('');

  return `<div>
    <div><strong>노선 이름</strong></div>
    ${lineNameInput}
    <div><strong>상행 종점</strong>${lineStartSelector(options)}</div>
    <div><strong>하행 종점</strong>${lineEndSelector(options)}</div>
    ${lineAddButton}
  </div>`;
};

const lineNameInput = '<input id="line-name-input"></input>';
const lineStartSelector = options => {
  return `<select id="line-start-station-selector">${options}</select>`;
};
const lineEndSelector = options => {
  return `<select id="line-end-station-selector">${options}</select>`;
};
const lineAddButton = '<button id="line-add-button">노선 추가</button>';

export const lineList = lines => {
  return `<div> 
    <h2>🚉지하철 노선 목록</h2>
    ${lineTable(lines)}
  </div>`;
};

const lineTable = lines => {
  return `<table
    ${lineTableHeader}
    ${lines
      .map((line, idx) => {
        return `<tr>
          ${lineName(line.name)}
          ${lineStartName(line.getStart().name)}
          ${lineEndName(line.getEnd().name)}
          ${lineDeleteButton(idx)}
        </tr>`;
      })
      .join('')}
  </table>`;
};

const lineTableHeader =
  '<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>';

const lineDeleteButton = index => {
  return `<td>
    <button class="line-delete-button" data-item=${index}>삭제</button>
  </td>`;
};

const lineName = name => {
  return `<td>${name}</td>`;
};

const lineStartName = name => {
  return `<td>${name}</td>`;
};

const lineEndName = name => {
  return `<td>${name}</td>`;
};

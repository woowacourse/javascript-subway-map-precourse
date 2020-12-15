export const lineAddContainer = stations => {
  return `<div>
    <div>
      <strong>노선 이름</strong>
    </div>
    <input id="line-name-input" placeholder="노선 이름을 입력해 주세요."></input>
    ${lineStart(stations)}
    ${lineEnd(stations)}
    <button id="line-add-button">노선 추가</button>
  </div>`;
};

const lineStart = stations => {
  return `<div>
    <strong>상행 종점</strong>
    <select id="line-start-station-selector">${options(stations)}</select>
  </div>`;
};

const lineEnd = stations => {
  return `<div>
    <strong>하행 종점</strong>
    <select id="line-end-station-selector">${options(stations)}</select>
  </div>`;
};

const options = stations => {
  return stations
    .map(({ name }) => {
      return `<option value=${name}>${name}</option>`;
    })
    .join('');
};

export const lineList = lines => {
  return `<div> 
    <h2>🚉지하철 노선 목록</h2>
    <table
      <tr>
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
      </tr>
      ${lineTableRows(lines)}
    </table>
  </div>`;
};

const lineTableRows = lines => {
  return lines
    .map(({ name, getStart, getEnd }) => {
      return `<tr>
      <td>${name}</td>
      <td>${getStart().name}</td>
      <td>${getEnd().name}</td>
      <td>
        <button class="line-delete-button" data-item=${name}>삭제</button>
      </td>
    </tr>`;
    })
    .join('');
};

const LINE_INPUT_FORM = `
<div id="line-input-form">
  <label for="line-name">노선 이름</label>
  <div>
    <input 
      type="text" 
      id="line-name-input" 
      name="line-name" 
      placeholder="노선 이름을 입력해주세요.">
    </input> 
  </div>
  <div>
    <label for="start-station">상행 종점</label>
    <select name="start-station" id="line-start-station-selector"></select></br>
    <label for="end-station">하행 종점</label>
    <select name="end-station" id="line-end-station-selector"></select>
  </div>
  <button id="line-add-button">노선 추가</button>
</div>
`;
const LINE_LIST = `
<div id="line-list">
  <h2>🚉 지하철 노선 목록</h2>
  <table id="line-names">
  </table>
</div>
`;
const LINE_LIST_HEADER = `
<tr>
  <th>노선 이름</th>
  <th>상행 종점역</th>
  <th>하행 종점역</th>
  <th>설정</th>
</tr>
`;
const LINE_DELETE_BUTTON = `
<td><button class="line-delete-button">삭제</button></td>
`;

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = LINE_INPUT_FORM + LINE_LIST;
};

const createStationSelector = (_stations) => {
  const startStationSelector = document.getElementById(
    "line-start-station-selector"
  );
  const endStationSelector = document.getElementById(
    "line-end-station-selector"
  );

  for (let i = 0; i < _stations.length; i++) {
    startStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
    endStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
  }
};

const createLineList = (_lines) => {
  const lineNames = document.getElementById("line-names");
  lineNames.innerHTML = LINE_LIST_HEADER;

  for (let i = 0; i < _lines.length; i++) {
    lineNames.innerHTML += `
    <tr data-line-index="${i}">
      <td>${_lines[i].name}</td>
      <td>${_lines[i].startStation()}</td>
      <td>${_lines[i].endStation()}</td>
      ${LINE_DELETE_BUTTON}
    </tr>
    `;
  }
};

export { printLayout, createStationSelector, createLineList };

const STATION_INPUT_FORM = `
<div id="station-input-form">
  <label for="station-name">역 이름</label>
  <div>
    <input 
      type="text" 
      id="station-name-input" 
      name="station-name" 
      placeholder="역 이름을 입력해주세요.">
    </input> 
    <button id="station-add-button">역 추가</button>
  </div>
</div>
`;
const STATION_LIST = `
<div id="station-list">
  <h2>🚉 지하철 역 목록</h2>
  <table id="station-names">
  </table>
</div>
`;
const STATION_LIST_HEADER = `
<tr>
  <th>역 이름</th>
  <th>설정</th>
</tr>
`;
const STATION_DELETE_BUTTON = `
<td><button class="station-delete-button">삭제</button></td>
`;

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = STATION_INPUT_FORM + STATION_LIST;
};

const createStationList = (_stations) => {
  const stationNames = document.getElementById("station-names");
  stationNames.innerHTML = STATION_LIST_HEADER;

  for (let i = 0; i < _stations.length; i++) {
    stationNames.innerHTML += `<tr data-station-index="${i}"><td>${_stations[i].name}</td>${STATION_DELETE_BUTTON}</tr>`;
  }
};

export { printLayout, createStationList };

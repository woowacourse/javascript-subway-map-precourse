const stationManagerBtn = document.getElementById("station-manager-button");
const stationInputForm = `
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
const stationListOpenTag = `
<div id="station-list">
  <h2>🚉 지하철 역 목록</h2>
  <table id="station-names">
    <tr>
      <th>역 이름</th>
      <th>설정</th>
    </tr>
`;
const stationDeleteBtn = `
<td><button class="station-delete-button">삭제</button></td>
`;
const stationListCloseTag = `
  </table>
</div>
`;

const getStationList = (_stations) => {
  let stationList = "";

  for (let i = 0; i < _stations.length; i++) {
    stationList += `<tr><td>${_stations[i]}</td>${stationDeleteBtn}</tr>`;
  }

  return stationListOpenTag + stationList + stationListCloseTag;
};

const getStationName = () => {
  return document.getElementById("station-name-input").value;
};

const printLayout = (_stations) => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = stationInputForm + getStationList(_stations);
};

const createStation = (_stations) => {
  _stations.push(getStationName());
  printLayout(_stations);
};

export default function StationManager() {
  const stations = ["인천", "동인천"];

  printLayout(stations);

  const stationAddBtn = document.getElementById("station-add-button");

  stationAddBtn.addEventListener("click", () => {
    createStation(stations);
  });
}

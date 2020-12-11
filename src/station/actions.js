const managerContainer = document.getElementById("manager-container");
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

const getStationList = (_station) => {
  let stationList = "";

  for (let i = 0; i < _station.length; i++) {
    stationList += `<tr><td>${_station[i]}</td>${stationDeleteBtn}</tr>`;
  }

  return stationListOpenTag + stationList + stationListCloseTag;
};

const init = () => {
  const station = ["인천", "동인천", "도원", "소요산"];

  managerContainer.innerHTML = stationInputForm + getStationList(station);
};

export default function StationManager() {
  init();
}

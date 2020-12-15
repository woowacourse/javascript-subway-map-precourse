import { STATION_NAME_INPUT, STATION_ADD_BUTTON, STATION_DELETE_BUTTON } from "../../constants/tag.js";

function stationManagerPage(subwayDatas) {
  let table = ``;

  let stations = subwayDatas.subwayStations;
  stations &&
    stations.forEach((station) => {
      table += `<tr>
      <td>${station.name}</td>
      <td>
        <button class=${STATION_DELETE_BUTTON}>삭제</button>
      </td>
    </tr>`;
    });

  let stationManager = `
  <h4>역 이름<h4>
  <input id = ${STATION_NAME_INPUT} value = "역 이름을 입력해주세요."></input>
  <button id = ${STATION_ADD_BUTTON}>역 추가</button>
  <h3>🚉지하철 역 목록</h3>
  
  <table border = 1px solid black>
    <thead>
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
    </thead>
    <tbody>
    ${table}
    </tbody>
  </table>
  `;
  return stationManager;
}

export default stationManagerPage;

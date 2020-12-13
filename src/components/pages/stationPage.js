function stationManagerPage(subwayDatas) {
  let table = ``;

  let stations = subwayDatas.subwayStations;
  stations &&
    stations.map((station) => {
      table += `<tr>
      <td>${station.name}</td>
      <td>
        <button class="station-delete-button">삭제</button>
      </td>
    </tr>`;
    });

  let stationManager = `
  <h4>역 이름<h4>
  <input id = "station-add-input"></input>
  <button id = "station-add-button">역 추가</button>
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

export { stationManagerPage };

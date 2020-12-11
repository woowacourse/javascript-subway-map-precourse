function lineManagerPage(subwayDatas) {
  let options = subwayDatas.subwayStations.map((station) => `<option value = "${station.name}">${station.name}</option>`);
  let table = ``;

  subwayDatas.lines &&
    subwayDatas.lines.map(
      (line) =>
        (table += `<tr>
            <td>${line.name}</td>
            <td>${line.stops[0]}</td>
            <td>${line.stops[line.stops.length - 1]}</td>
            <td><button class="line-delete-button">삭제</button></td>
          </tr>`)
    );

  let lineManager = `
  <h4>노선 이름<h4>
  <input id = "line-name-input"></input>
  <br />
  <br />
  <label>상행 종점</label>
    <select id="line-start-station-selector">
    ${options}
    </select>
  <br />
  <label>하행 종점</label>
    <select id="line-end-station-selector">
    ${options}
    </select>
  <br />
  <br />
  <button id = "line-add-button">노선 추가</button>
  <h3>🚉지하철 노선 목록</h3>
  <table border = 1px solid black>
    <thead>
      <tr>
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
      </tr>
    </thead>
    <tbody>
      ${table}
    </tbody>
  </table>
  `;

  return lineManager;
}

export default lineManagerPage;

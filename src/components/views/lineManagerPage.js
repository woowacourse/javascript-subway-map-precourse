function lineManagerPage() {
  let stations = JSON.parse(localStorage.getItem("stations"));
  let options = stations.map((station) => `<option value = "${station}">${station}</option>`);

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
      <tr>
        <td>1호선</td>
        <td>인천</td>
        <td>소요산</td>
        <td><button class="line-delete-button">삭제</button></td>
      </tr>
    </tbody>
  </table>
  `;

  return lineManager;
}

export default lineManagerPage;

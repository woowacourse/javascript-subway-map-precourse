export default class LineManagerView {
  static view() {
    document.getElementById('sub-view-container').innerHTML = `
    <h4>노선 이름</h4>
    <h2>🚉 지하철 노선 목록</h2>
    <div id='line-input'></div>
    <br/>
    <div id='line-table'></div>
    `;
    this.lineInputView();
    this.lineTableView();
  }

  static lineInputView() {
    const stations = localStorage.getItem('Stations').split(',');
    document.getElementById('line-input').innerHTML = `
    <input id='line-name-input' type='text' placeholder='노선 이름을 입력해주세요.'/>
    <p>상행 종점
      <select id='line-start-station-selector'>
      ${stations.map((station) => `<option value='${station}'>${station}</option>`)}
      </select>
    </p>
    <p>하행 종점
      <select id='line-end-station-selector'>
      ${stations.map((station) => `<option value='${station}'>${station}</option>`)}
      </select>
    </p>
    <button id='line-add-button'>노선 추가</button>`;
  }

  static lineTableView() {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    document.getElementById('line-table').innerHTML = `
    <table border='1px solid black'>
      <tr>
        <th align='center'>노선 이름</th>
        <th align='center'>상행 종점역</th>
        <th align='center'>하행 종점역</th>
        <th algin='center'>설정</th>
      </tr>
      ${Object.keys(lines).map((line) => `
      <tr>
        <td align="center">${line}</td>
        <td align="center">${lines[line][0]}</td>
        <td align="center">${lines[line][(lines[line].length - 1)]}</td>
        <td align="center"><button class='line-delete-button'>삭제</button></td>
      </tr>`).join('')}
    </table>`;
  }
}
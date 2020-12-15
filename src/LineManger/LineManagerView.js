import LineErrorMsg from './LineErrorMsg.js';

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
    const stations = JSON.parse(localStorage.getItem('Stations'));
    document.getElementById('line-input').innerHTML = `
    <input id='line-name-input' type='text' placeholder='노선 이름을 입력해주세요.'/>
    <p>상행 종점
      <select id='line-start-station-selector'>
      ${Object.keys(stations).map((station) => `<option value='${station}'>${station}</option>`)}
      </select>
    </p>
    <p>하행 종점
      <select id='line-end-station-selector'>
      ${Object.keys(stations).map((station) => `<option value='${station}'>${station}</option>`)}
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
        <td align="center">${lines[line].stations[0]}</td>
        <td align="center">${lines[line].stations[(lines[line].stations.length - 1)]}</td>
        <td align="center"><button class='line-delete-button' data-delete-target='${line}'>삭제</button></td>
      </tr>`).join('')}
    </table>`;
  }

  static alertError(errorNum) {
    alert(LineErrorMsg.error(errorNum));
  }

  static confirmDelete() {
    return window.confirm('정말로 삭제 하시겠습니까?');
  }
}
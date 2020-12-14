export default class StationManagerView {
  static view() {
    this.stationInitView();
    this.stationInputView();
    this.stationTableView();
  }

  static stationInitView() {
    document.getElementById('sub-view-container').innerHTML = `
    <div id="station-input-view"></div>
    <div id="station-table-view"></div>
    `;
  }

  static stationInputView() {
    document.getElementById('station-input-view').innerHTML = `
    <h4>역 이름</h4>
    <input id='station-name-input' type='text' placeholder='역 이름을 입력해주세요.'/>
    <button id='station-add-button'>역 추가</button>
    `;
  }

  static stationTableView() {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    document.getElementById('station-table-view').innerHTML = `
    <h2>🚉 지하철 역 목록</h2>
    <table border='1px solid black'>
      <tr>
        <th align="center">역 이름</th>
        <th align="center">설정</th>
      </tr>
      ${Object.keys(stations).map((station) => `
      <tr>
        <td align="center">${station}</td>
        <td><button class="station-delete-button" data-delete-target="${station}">삭제</button></td>
      </tr>`).join('')}
    </table>`;
  }

  static alertNameError() {
    alert('invalid Error');
  }

  static confirmDelete() {
    return window.confirm('정말로 삭제 하시겠습니까?');
  }
}

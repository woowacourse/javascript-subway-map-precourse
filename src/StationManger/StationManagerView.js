export default class StationManagerView {
  static View() {
    this.StationInitView();
    this.StationInputView();
    this.StationTableView();
  }

  static StationInitView() {
    document.getElementById('sub-view-container').innerHTML = `
    <div id="station-input-view"></div>
    <div id="station-table-view"></div>
    `;
  }

  static StationInputView() {
    document.getElementById('station-input-view').innerHTML = `
    <h4>역 이름</h4>
    <input id='station-name-input' type='text' placeholder='역 이름을 입력해주세요.'/>
    <button id='station-add-button'>역 추가</button>
    `;
  }

  static StationTableView() {
    const stations = localStorage.getItem('Stations').split(',');
    document.getElementById('station-table-view').innerHTML = `
    <h2>🚉 지하철 역 목록</h2>
    <table border='1px solid black'>
      <tr>
        <th align="center">역 이름</th>
        <th align="center">설정</th>
      </tr>
      ${stations.map((station) => `
      <tr>
        <td aligh="center">${station}</td>
        <td><button class="station-delete-button">삭제</button></td>
      </tr>`).join('')}
    </table>`;
  }
}
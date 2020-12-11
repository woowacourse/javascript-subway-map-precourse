export default class SectionManagerView {
  static view() {
    document.getElementById('sub-view-container').innerHTML = `
    <div id='section-select'></div>
    <div id='section-input'></div>
    <br/>
    <div id='section-table'></div>
    `;
    this.sectionSelectView();
  }

  static sectionSelectView() {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    document.getElementById('section-select').innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요.</h3>
      ${Object.keys(lines).map((line) => `<button class='section-line-menu-button' data-menu='${line}'>${line}</button> `).join('')}
    `;
  }

  static sectionInputView(line) {
    const stations = localStorage.getItem('Stations').split(',');
    document.getElementById('section-input').innerHTML = `
      <h3>${line} 관리</h3>
      <h4>구간 등록</h4>
      <select id="section-station-selector">
        ${stations.map((station) => `<option value='${station}'>${station}</option>`)}
      </select>
      <input id='section-order-input' type='number' min='0' placeholder='순서'/>
      <button id='section-add-button'>등록</button>`;
  }

  static sectionTableView(line) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = lines[line];
    document.getElementById('section-table').innerHTML = `<table border='1px solid black'>
    <tr>
      <th align='center'>순서</th>
      <th align='center'>이름</th>
      <th algin='center'>설정</th>
    </tr>
    ${stations.map((station) => `
    <tr>
      <td align="center">${stations.indexOf(station)}</td>
      <td align="center">${station}</td>
      <td align="center"><button class='section-delete-button' data-delete-target='${station}'>노선에서 제거</button></td>
    </tr>`).join('')}
  </table>`;
  }

  static alertInputError() {
    alert('invalid Error');
  }

  static confirmDelete() {
    return window.confirm('정말로 삭제 하시겠습니까?');
  }
}

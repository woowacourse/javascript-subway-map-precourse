import StationManagerView from '../StationManger/StationManagerView.js'
import LineManagerView from '../LineManger/LineManagerView.js';

export default class MenuView {
  static menuButtonListView() {
    document.getElementById('app').innerHTML += `
    <button id="station-manager-button">1.역 관리</button>
    <button id="line-manager-button">2. 노선 관리</button>
    <button id="section-manager-button">3. 구간 관리</button>
    <button id="map-print-manager-button">4. 지하철 노선도 출력</button>
    <div id="sub-view-container"></div>
    `;
  }

  static stationManagerView() {
    StationManagerView.view();
  }

  static lineManagerView() {
    LineManagerView.view();
  }

  static sectionManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <div id='section-select'></div>
    <div id='section-input'></div>
    <br/>
    <div id='section-table'></div>
    `;
    this.sectionSelectView();
    this.sectionInputView(0);
    this.sectionTableView();
  }

  static sectionSelectView() {
    const lines = localStorage.getItem('Lines').split(',');
    document.getElementById('section-select').innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요.</h3>
      ${lines.map((line) => `<button id='line${lines.indexOf(line) + 1}'>${line}</button> `).join('')}
    `;
  }

  static sectionInputView(index) {
    const lines = localStorage.getItem('Lines').split(',');
    const stations = localStorage.getItem('Stations').split(',');
    document.getElementById('section-input').innerHTML = `
      <h3>${lines[index]} 관리</h3>
      <h4>구간 등록</h4>
      <select>
        ${stations.map((station) => `<option value='${station}'>${station}</option>`)}
      </select>
      <input type='number' min='0' placeholder='순서'/>
      <button id='add'>등록</button>`;
  }

  static sectionTableView() {
    const stations = localStorage.getItem('Stations').split(',');
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
      <td align="center"><button id='delete'>노선에서 제거</button></td>
    </tr>`).join('')}
  </table>`;
  }

  static mapPrintManagerView() {
    const stations = localStorage.getItem('Stations').split(',');
    const lines = localStorage.getItem('Lines').split(',');
    document.getElementById('sub-view-container').innerHTML = `
    ${lines.map((line) => `
    <h3>${line}</h3>
    <ul>
      <li>${stations[0]}</li>
      <li>${stations[stations.length - 1]}</li>
    </ul>`).join('')}
    `;
  }
}

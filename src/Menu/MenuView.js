import StationManagerView from '../StationManger/StationManagerView.js'
import LineManagerView from '../LineManger/LineManagerView.js';
import SectionManagerView from '../SectionManager/SectionManagerView.js';

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
    SectionManagerView.view();
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

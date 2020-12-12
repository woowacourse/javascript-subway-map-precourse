import Component from '../library/core/component.js';
import {
  LINE_MANAGER,
  MAP_PRINT_MANAGER,
  STATION_MANAGER,
  SECTION_MANAGER,
} from '../library/constants/route.js';

class Navigator extends Component {
  constructor($target, _props) {
    super($target, _props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <button id="station-manager-button">1. 역 관리</button>
      <button id="line-manager-button">2. 노선 관리</button>
      <button id="section-manager-button">3. 구간 관리</button>
      <button id="map-print-manager-button">4. 지하철 노선도 출력</button>
    `;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'station-manager-button') {
        this._props.routeTo(STATION_MANAGER);
      } else if (event.target.id === 'line-manager-button') {
        this._props.routeTo(LINE_MANAGER);
      } else if (event.target.id === 'section-manager-button') {
        this._props.routeTo(SECTION_MANAGER);
      } else if (event.target.id === 'map-print-manager-button') {
        this._props.routeTo(MAP_PRINT_MANAGER);
      }
    });
  }
}

export default Navigator;

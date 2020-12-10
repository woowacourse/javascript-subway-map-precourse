import Component from '../library/core/component.js';
import Navigator from './navigator.js';
import {
  LINE_MANAGER,
  MAP_PRINT_MANAGER,
  STATION_MANAGER,
  SECTION_MANAGER,
} from '../library/constants/route.js';
import StationManager from './station-manager/index.js';
import LineManager from './line-manager/index.js';
import MapPrintManager from './map-print-manager/index.js';
import SectionManager from './section-manager/index.js';

class App extends Component {
  _$navigator;
  _$routerView;

  constructor($target) {
    super($target);
    this.render();
    this.initializeComponents();
  }

  render = () => {
    this._$target.innerHTML = `
      <h1>🚇 지하철 노선도 관리</h1>
      <nav id="navigator"></nav>
      <main id="router-view"></main>
    `;
  };

  initializeComponents() {
    new Navigator(this._$navigator, { routeTo: this.routeTo });
  }

  routeTo = destination => {
    if (destination === STATION_MANAGER) {
      new StationManager(this._$routerView);
    }
    if (destination === LINE_MANAGER) {
      new LineManager(this._$routerView);
    }
    if (destination === MAP_PRINT_MANAGER) {
      new MapPrintManager(this._$routerView);
    }
    if (destination === SECTION_MANAGER) {
      new SectionManager(this._routerView);
    }
  };
}

export default App;

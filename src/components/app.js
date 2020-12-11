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
  constructor($target) {
    super($target);
    this.render();
  }

  render = () => {
    this._$target.innerHTML = `
      <h1>🚇 지하철 노선도 관리</h1>
      <nav id="navigator"></nav>
      <main id="router-view"></main>
    `;
    this.initializeComponents();
  };

  initializeComponents() {
    const $navigator = this._$target.querySelector('#navigator');
    new Navigator($navigator, { routeTo: this.routeTo });
  }

  routeTo = destination => {
    const $routerView = this._$target.querySelector('#router-view');
    if (destination === STATION_MANAGER) {
      new StationManager($routerView);
    }
    if (destination === LINE_MANAGER) {
      new LineManager($routerView);
    }
    if (destination === MAP_PRINT_MANAGER) {
      new MapPrintManager($routerView);
    }
    if (destination === SECTION_MANAGER) {
      new SectionManager($routerView);
    }
  };
}

export default App;

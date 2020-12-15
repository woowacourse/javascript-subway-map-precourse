import Menu from "./Menu.js";
import StationStore from "../store/stationStore.js";
import LineStore from "../store/lineStore.js";
import StationManager from "./StationManager/index.js";
import LineManager from "./LineManager/index.js";
import SectionManager from "./SectionManager/index.js";
import MapPrintManager from "./MapPrintManager/index.js";
import { loadStorage } from "../utils/storage.js";

class App {
  constructor($target) {
    this.$target = $target;

    this.initStates();
    this.render();
  }

  initStates() {
    const stations = loadStorage(`STATION2`);
    const lines = loadStorage(`LINE2`);

    this.stationStore = new StationStore(stations || []);
    this.lineStore = new LineStore(lines || []);
  }

  mountTemplates() {
    this.$target.innerHTML = `
      <h1>🚇 지하철 노선도 관리 </h1>
      <nav id="menu"></nav>
      <section id="manager-container"></section>
    `;
  }

  mountDOMs() {
    this.$menu = document.querySelector(`#menu`);
    this.$managerContainer = document.querySelector(`#manager-container`);
  }

  mountComponents() {
    new Menu(this.$menu, { changeMenu: this.changeMenu.bind(this) });
  }

  changeMenu(id) {
    if (id === `station-manager-button`) {
      new StationManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (id === `line-manager-button`) {
      new LineManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (id === `section-manager-button`) {
      new SectionManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (id === `map-print-manager-button`) {
      new MapPrintManager(this.$managerContainer, {
        lineStore: this.lineStore,
      });
    }
  }

  render = () => {
    this.mountTemplates();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default App;

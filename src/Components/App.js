import Menu from "./Menu.js";
import StationManager from "./StationManager/index.js";
import LineManager from "./LineManager/index.js";
import SectionManager from "./SectionManager/index.js";
import MapPrintManager from "./MapPrintManager/index.js";

import StationStore from "../store/stationStore.js";
import LineStore from "../store/lineStore.js";

import { loadStorage } from "../utils/storage.js";
import { STORAGE_KEY } from "../utils/constants/key.js";
import { ID } from "../utils/constants/dom.js";

class App {
  constructor($target) {
    this.$target = $target;

    this.initStates();
    this.render();
  }

  initStates() {
    const stations = loadStorage(STORAGE_KEY.STATION);
    const lines = loadStorage(STORAGE_KEY.LINE);

    this.stationStore = new StationStore(stations || []);
    this.lineStore = new LineStore(lines || []);
  }

  mountTemplates() {
    this.$target.innerHTML = `
      <h1>🚇 지하철 노선도 관리 </h1>
      <nav id=${ID.MENU}></nav>
      <section id=${ID.MANAGER_CONTAINER}></section>
    `;
  }

  mountDOMs() {
    this.$menu = document.querySelector(`#${ID.MENU}`);
    this.$managerContainer = document.querySelector(`#${ID.MANAGER_CONTAINER}`);
  }

  mountComponents() {
    new Menu(this.$menu, { changeMenu: this.changeMenu.bind(this) });
  }

  changeMenu(buttonId) {
    if (buttonId === ID.STATION_MANAGER_BUTTON) {
      new StationManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (buttonId === ID.LINE_MANAGER_BUTTON) {
      new LineManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (buttonId === ID.SECTION_MANAGER_BUTTON) {
      new SectionManager(this.$managerContainer, {
        stationStore: this.stationStore,
        lineStore: this.lineStore,
      });
    } else if (buttonId === ID.MAP_PRINT_MANAGER_BUTTON) {
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

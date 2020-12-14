import Menu from "./Menu.js";
import StationStore from "../store/stationStore.js";
import LineStore from "../store/lineStore.js";
import StationManager from "./StationManager/index.js";

class App {
  constructor($target) {
    this.$target = $target;

    this.initStates();
    this.render();
  }

  initStates() {
    const stations = JSON.parse(localStorage.getItem(`STATION`));
    const lines = JSON.parse(localStorage.getItem(`LINE`));

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
    } else if (id === `section-manager-button`) {
    } else if (id === `map-print-manager-button`) {
    }
  }

  render = () => {
    this.mountTemplates();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default App;

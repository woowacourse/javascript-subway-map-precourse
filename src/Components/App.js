import Menu from "./Menu.js";
import StationStore from "../store/stationStore.js";
import LineStore from "../store/lineStore.js";

class App {
  constructor({ $target }) {
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
    new Menu({ $target: this.$menu, changeMenu: this.changeMenu.bind(this) });
  }

  changeMenu(id) {
    switch (id) {
      case `station-manager-button`:
        console.log("역 관리");
        break;
      case `line-manager-button`:
        console.log("노선 관리");
        break;
      case `section-manager-button`:
        console.log("구간 관리");
        break;
      case `map-print-manager-button`:
        console.log("노선도 관리");
        break;

      default:
        return;
    }
  }

  render = () => {
    this.mountTemplates();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default App;

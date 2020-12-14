import { MenuInnerHTML } from "../utils/templates/main.js";
import { makeElement } from "../utils/domUtil.js";
import Menu from "./Menu.js";
import ManagerContainer from "./ManagerContainer.js";
import StationStore from "../models/StationStore.js";

class App {
  constructor($target) {
    this.$target = $target;

    this.stationStore = new StationStore("TEST1");

    this.createDOMs();
    this.mountDOMs();
    this.mountComponents();
  }

  createDOMs() {
    this.$menu = makeElement(`nav`, { id: `menu` }, MenuInnerHTML);
    this.$managerContainer = makeElement(`div`, { id: `manager-container` });
  }

  mountDOMs() {
    this.$target.appendChild(this.$menu);
    this.$target.appendChild(this.$managerContainer);
  }

  mountComponents() {
    this.managerContainer = new ManagerContainer({
      $target: this.$managerContainer,
      stationStore: this.stationStore,
    });

    this.menu = new Menu({
      $target: this.$menu,
      managerContainer: this.managerContainer,
    });
  }
}

export default App;

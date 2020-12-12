import { clearInnerHTML, makeElement } from "../utils/domUtil.js";
import { DOM } from "../constants/index.js";
import StationManager from "./StationManager.js";

class ManagerContainer {
  constructor({ $target }) {
    this.$target = $target;

    this.mountDOMs();
    this.mountComponents();

    this.innerHTML = ``;
    this.render();
  }

  mountDOMs() {
    this.$stationManager = makeElement("div", { id: "station-manager" });
  }

  mountComponents() {
    this.stationManager = new StationManager({
      $target: this.$stationManager,
    });
  }

  setInnerHTML(targetId) {
    switch (targetId) {
      case DOM.STATION_MANAGER_BUTTON:
        this.innerHTML = this.$stationManager.outerHTML;
        break;

      case DOM.LINE_MANAGER_BUTTON:
        this.innerHTML = `라인`;
        break;

      case DOM.SECTION_MANAGER_BUTTON:
        this.innerHTML = `섹션`;
        break;

      case DOM.MAP_PRINT_MANAGER_BUTTON:
        this.innerHTML = `맵`;
        break;

      default:
        return;
    }

    this.render();
  }

  render() {
    clearInnerHTML(this.$target);
    this.$target.innerHTML = this.innerHTML;
  }
}

export default ManagerContainer;

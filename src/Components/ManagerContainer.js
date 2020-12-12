import { DOM } from "../constants/index.js";
import { clearInnerHTML, makeElement } from "../utils/domUtil.js";
import { StationManagerInnerHTML } from "../utils/templates/stationManager.js";
import StationManager from "./StationManager.js";

class ManagerContainer {
  constructor({ $target }) {
    this.$target = $target;

    this.createDOMs();
  }

  createDOMs() {
    this.$stationManager = makeElement(
      "div",
      { id: `station-manager` },
      StationManagerInnerHTML(),
    );
  }

  mountComponent(targetId) {
    clearInnerHTML(this.$target);

    switch (targetId) {
      case DOM.STATION_MANAGER_BUTTON:
        this.$target.appendChild(this.$stationManager);
        this.stationManager = new StationManager({
          $target: this.$stationManager,
        });
        break;

      default:
        return;
    }
  }
}

export default ManagerContainer;

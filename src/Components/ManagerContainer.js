import { DOM } from "../constants/index.js";
import { clearInnerHTML, makeElement } from "../utils/domUtil.js";
import { LineManagerInnerHTML } from "../utils/templates/lineManager.js";
import { StationManagerInnerHTML } from "../utils/templates/stationManager.js";
import LineManager from "./LineManager.js";
import StationManager from "./StationManager.js";

class ManagerContainer {
  constructor({ $target, stationStore }) {
    this.$target = $target;
    this.stationStore = stationStore;

    this.createDOMs();
    this.mountComponents();
  }

  createDOMs() {
    this.$stationManager = makeElement(
      `div`,
      { id: `station-manager` },
      StationManagerInnerHTML(),
    );

    this.$lineManager = makeElement(
      `div`,
      { id: `line-manager` },
      LineManagerInnerHTML(),
    );
  }

  mountComponents() {
    this.stationManager = new StationManager({
      $target: this.$stationManager,
      stationStore: this.stationStore,
    });

    this.lineManager = new LineManager({
      $target: this.$lineManager,
      stationStore: this.stationStore,
    });
  }

  mountDOM(targetId) {
    clearInnerHTML(this.$target);

    switch (targetId) {
      case DOM.STATION_MANAGER_BUTTON:
        this.$target.appendChild(this.$stationManager);
        break;

      case DOM.LINE_MANAGER_BUTTON:
        this.$target.appendChild(this.$lineManager);
        this.lineManager.renderSelect(this.stationStore.getStationNames());
        break;

      default:
        return;
    }
  }
}

export default ManagerContainer;

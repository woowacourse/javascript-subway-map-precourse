import { clearInnerHTML } from "../utils/domUtil.js";
import { DOM } from "../constants/index.js";

class ManagerContainer {
  constructor({ $target }) {
    this.$target = $target;

    this.innerHTML = ``;
    this.render();
  }

  setInnerHTML(targetId) {
    switch (targetId) {
      case DOM.STATION_MANAGER_BUTTON:
        this.innerHTML = `역`;
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

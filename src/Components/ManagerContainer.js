import { clearInnerHTML } from "../utils/domUtil.js";
import { DOM } from "../constants/index.js";

class ManagerContainer {
  constructor({ $target }) {
    this.$target = $target;

    this.innerHTML = ``;
  }

  render() {
    clearInnerHTML(this.$target);
    this.$target.innerHTML = this.innerHTML;
  }

  createInnerHTML(targetId) {
    switch (targetId) {
      case DOM.STATION_MANAGER:
        this.innerHTML = `역`;
        break;

      case DOM.LINE_MANAGER:
        this.innerHTML = `라인`;
        break;

      case DOM.SECTION_MANAGER:
        this.innerHTML = `섹션`;
        break;

      case DOM.MAP_PRINT_MANAGER:
        this.innerHTML = `맵`;
        break;

      default:
        return;
    }

    this.render();
  }
}

export default ManagerContainer;

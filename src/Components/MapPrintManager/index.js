import {
  NoneLineMapHTML,
  createLineListHTML,
} from "../../utils/templates/mapPrintManagerTemplate.js";

class MapPrintManager {
  constructor($target, { lineStore }) {
    this.$target = $target;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    const lines = this.lineStore.lines;

    this.$target.innerHTML = lines.length
      ? createLineListHTML(lines)
      : NoneLineMapHTML;
  }

  render = () => {
    this.mountTemplate();
  };
}

export default MapPrintManager;

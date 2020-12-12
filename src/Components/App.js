import { MenuInnerHTML } from "../utils/templates/main.js";
import { makeElement } from "../utils/domUtil.js";

class App {
  constructor($target) {
    this.$target = $target;
    this.createDOMs();
    this.mountDOMs();
  }

  createDOMs() {
    this.$menu = makeElement(`nav`, { id: `menu` }, MenuInnerHTML);
    this.$managerContainer = makeElement(`div`, { id: `manager-container` });
  }

  mountDOMs() {
    this.$target.appendChild(this.$menu);
    this.$target.appendChild(this.$managerContainer);
  }
}

export default App;

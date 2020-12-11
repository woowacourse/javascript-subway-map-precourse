import {
  TitleHTML,
  MenuHTML,
  ManagerContainerHTML,
} from "../utils/templates/app.js";
import { clearInnerHTML } from "../utils/domUtil.js";

class App {
  constructor($target) {
    this.$target = $target;
    this.initHTML();
    this.mountDOM();

    console.log(this);
  }

  initHTML() {
    clearInnerHTML(this.$target);
    this.$target.innerHTML = TitleHTML() + MenuHTML() + ManagerContainerHTML();
  }

  mountDOM() {
    this.$menu = this.$target.querySelector(`#menu`);
    this.$managerContainer = this.$target.querySelector(`#manager-container`);
  }
}

export default App;

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
  }

  initHTML() {
    clearInnerHTML(this.$target);
    this.$target.innerHTML = TitleHTML() + MenuHTML() + ManagerContainerHTML();
  }

  mountDOM() {}
}

export default App;

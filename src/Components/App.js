import {
  TitleHTML,
  MenuHTML,
  ManagerContainerHTML,
} from "../utils/templates/app.js";
import { clearInnerHTML } from "../utils/domUtil.js";

import Menu from "./Menu.js";
import ManagerContainer from "./ManagerContainer.js";

class App {
  constructor($target) {
    this.$target = $target;
    this.initHTML();
    this.mountDOM();
    this.mountComponent();

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

  mountComponent() {
    this.managerContainer = new ManagerContainer({
      $target: this.$managerContainer,
    });

    this.menu = new Menu({
      $target: this.$menu,
      managerContainer: this.managerContainer,
    });
  }
}

export default App;

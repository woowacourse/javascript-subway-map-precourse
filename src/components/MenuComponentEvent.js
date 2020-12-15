import MenuComponentRender from "./MenuComponentRender.js";
import { INITIAL_STATE_ID } from "../utils/constants.js";
import selectMenuComponent from "../utils/selectMenuComponent.js";

export default class MenuComponentEvent extends MenuComponentRender {
  constructor() {
    super();
    this.initState(INITIAL_STATE_ID);
    this.eventDOM();
  }

  initState(stateId) {
    this._clear();
    this.selectedStateId = stateId;
    this.selectedMenuComponent = selectMenuComponent(this.selectedStateId);
  }

  eventDOM() {
    this.menuNav.addEventListener("click", (e) => this._onClickMenuNav(e));
  }

  _onClickMenuNav(e) {
    const target = e.target;
    const targetId = target.id;

    if (!this.isButton(target.localName)) return;
    this.initState(targetId);
  }

  isButton(element) {
    if (element === "button") return true;
    return false;
  }
}

import MenuComponentRender from "./MenuComponentRender.js";

export default class MenuComponentEvent extends MenuComponentRender {
  constructor() {
    super();
    console.log("--MenuComponentEvent--");
    this.selectState = "";
    this.selectMenuComponent = "";
    this.eventDOM();
  }

  eventDOM() {
    this.menuNav.addEventListener("click", (e) => this._onClickMenuNav(e));
  }

  _onClickMenuNav(e) {
    const target = e.target;
    const targetId = target.id;

    if (!this.isButton(target.localName)) return;
    console.log(targetId);
  }

  isButton(element) {
    if (element === "button") return true;
    return false;
  }
}

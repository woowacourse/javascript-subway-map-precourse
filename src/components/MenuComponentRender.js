import { DOM_MENU, DOM_ID } from "../utils/constants.js";

export default class MenuComponentRender {
  constructor() {
    console.log("--MenuComponentRender--");
    this._app = document.getElementById(DOM_ID.ID);
    this.initDOM();
    this.render();
  }

  initDOM() {
    this.menuNav = document.createElement("div");
    this.menuNav.setAttribute("id", DOM_MENU.MENU_NAV_ID);
  }

  render() {
    const menuInnerHTML = `
        <button id=${DOM_MENU.STATION_MANAGER_BUTTON_ID}>1. 역 관리</button>
        <button id=${DOM_MENU.LINE_MANAGER_BUTTON_ID}>2. 노선 관리</button>
        <button id=${DOM_MENU.SECTION_MANAGER_BUTTON_ID}>3. 구간 관리</button>
        <button id=${DOM_MENU.MAP_PRINT_MANAGER_BUTTON_ID}>4. 지하철 노선도 출력</button>
    `;

    this.menuNav.innerHTML = menuInnerHTML;
    this._app.appendChild(this.menuNav);
  }

  _clear() {
    while (this._app.children.length > 2) {
      this._app.children[this._app.children.length - 1].remove();
    }
  }
}

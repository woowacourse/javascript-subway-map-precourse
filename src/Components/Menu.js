import { ID } from "../utils/constants/dom.js";

class Menu {
  constructor($target, { changeMenu }) {
    this.$target = $target;
    this.changeMenu = changeMenu;

    this.buttonsId = [
      ID.STATION_MANAGER_BUTTON,
      ID.LINE_MANAGER_BUTTON,
      ID.SECTION_MANAGER_BUTTON,
      ID.MAP_PRINT_MANAGER_BUTTON,
    ];

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <button id=${ID.STATION_MANAGER_BUTTON}>1. 역관리</button>
      <button id=${ID.LINE_MANAGER_BUTTON}>2. 노선 관리</button>
      <button id=${ID.SECTION_MANAGER_BUTTON}>3. 구간 관리</button>
      <button id=${ID.MAP_PRINT_MANAGER_BUTTON}>4. 지하철 노선도 출력</button>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!this.buttonsId.includes(target.id)) return;

    this.changeMenu(target.id);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default Menu;

import {MENU} from '../constants.js';

class Menu {
  template() {
    return `
    <div id=${MENU.ID}>
      <button id=${MENU.BUTTON.STATION.ID}>1. 역 관리</button>
      <button id=${MENU.BUTTON.LINE.ID}>2. 노선 관리</button>
      <button id=${MENU.BUTTON.SECTION.ID}>3. 구간 관리</button>
      <button id=${MENU.BUTTON.MAP.ID}>4. 지하철 노선도 출력</button>
    </div>
    `;
  }
}

const menu = new Menu();

export default menu;

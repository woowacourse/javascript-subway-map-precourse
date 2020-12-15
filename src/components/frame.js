import {MENU, MAIN} from '../constants.js';

class Frame {
  frameTemplate() {
    return `
      <div id=${MENU.ID}>
        <button id=${MENU.BUTTON.STATION.ID}>1. 역 관리</button>
        <button id=${MENU.BUTTON.LINE.ID}>2. 노선 관리</button>
        <button id=${MENU.BUTTON.SECTION.ID}>3. 구간 관리</button>
        <button id=${MENU.BUTTON.MAP.ID}>4. 지하철 노선도 출력</button>
      </div><br>

      <div id=${MAIN.ID}></div>
    `;
  }

  globalStyle() {
    const style = document.createElement('style');
    style.innerText = 'table, td, tr, th { border:1px solid}';

    document.head.appendChild(style);
  }
}

const frame = new Frame();

export const {frameTemplate, globalStyle} = frame;

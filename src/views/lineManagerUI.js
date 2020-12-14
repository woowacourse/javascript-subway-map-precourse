import { DOMs, DOMStrings, DOMCtrl, dataStrings, strings } from '../doms.js';

export default class LineManagerUI {
  openLineManager(stations, lines) {
    const lineManager = `
      <div id="${DOMStrings.LINE_MANAGER}"><br>
        <span>${strings.LINE_NAME}</span><br>
        <input type="text" id="${DOMStrings.LINE_NAME_INPUT}" placeholder="${strings.LINE_PLACEHOLDER}" /><br><br>
        ${this.getLineSelectors(stations)}
        <button id="${DOMStrings.LINE_ADD_BUTTON}">${strings.LINE_ADD}</button>
        <h1>${strings.LINE_LIST_TITLE}</h1>
        ${this.getLineList(lines)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = lineManager;
  }

  getLineSelectors(stations) {
    return `
      <span>${strings.LINE_START} 
        <select id="${DOMStrings.LINE_START_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br>
      <span>${strings.LINE_END} 
        <select id="${DOMStrings.LINE_END_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br><br>
    `;
  }

  getLineList(lines) {
    return `
      <table id="${DOMStrings.LINE_LIST_TABLE}">
        ${this.getLineListHeader()}
        ${lines.map(line => this.getLineListContent(line)).join('')}
      </table>
    `;
  }

  getLineListHeader() {
    return `
      <tr>
        <th><b>${strings.LINE_NAME}</b></th>
        <th><b>${strings.LINE_START_STATION}</b></th>
        <th><b>${strings.LINE_END_STATION}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  }

  getLineListContent(line) {
    return `
      <tr>
        <td>${line.lineName}</td>
        <td>${line.start}</td>
        <td>${line.end}</td>
        <td><button class="${DOMStrings.LINE_DELETE_BUTTON}" 
          data-${dataStrings.DATA_LINE}="${line.lineName}">${strings.DELETE}</button></td>
      </tr>
    `;
  }
}

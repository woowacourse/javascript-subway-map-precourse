import { DOMs, DOMCtrl, DOMStrings, dataStrings, strings } from '../doms.js';

export default class StationUI {
  openStationManager(stations) {
    const stationManager = `
      <div id="${DOMStrings.STATION_MANAGER}"><br>
        <span>${strings.STATION_NAME}</span><br>
        <input type="text" id="${DOMStrings.STATION_NAME_INPUT}" placeholder="${strings.STATION_PLACEHOLDER}"/>
        <button id="${DOMStrings.STATION_ADD_BUTTON}"> ${strings.STATION_ADD}</button>
        <h1>${strings.STATION_LIST_TITLE}</h1>
        ${this.getStationList(stations)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = stationManager;
  }

  getStationList(stations) {
    return `
      <table id="${DOMStrings.STATION_LIST_TABLE}">
        <tr>
          <th><b>${strings.STATION_NAME}</b></th>
          <th><b>${strings.SETTING}</b></th>
        </tr>
        ${stations
          .map(
            station => `<tr><td>${station}</td><td><button class="${DOMStrings.STATION_DELETE_BUTTON}" 
              data-${dataStrings.DATA_STATION}="${station}">${strings.DELETE}</button></td></tr>`
          )
          .join('')}
      </table>
    `;
  }
}

import { DOMs, DOMCtrl, DOMStrings, dataStrings, strings } from '../doms.js';

export default class SectionManagerUI {
  openSectionManager(lines) {
    const sectionContainer = `
      <div id="${DOMStrings.SECTION_CONTAINER}"><h2>${strings.SECTION_SELECT_TITLE}</h2>
        ${lines
          .map(
            line =>
              `<button class="${DOMStrings.SECTION_LINE_MENU_BUTTON}" 
              data-${dataStrings.DATA_LINE}="${line.lineName}">${line.lineName}</button>`
          )
          .join(' ')}
        <div id="${DOMStrings.SECTION_MANAGER}"></div>
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = sectionContainer;
  }

  openSection(stations, lines, lineName) {
    const lineIndex = lines.findIndex(line => line.lineName === lineName);
    const sectionManager = `
      <h2 id="${DOMStrings.SECTION_HEADER}" data-${dataStrings.DATA_TARGET}="${lineName}">
        ${lineName} ${strings.MANAGE}
      </h2>
      <h3>${strings.SECTION_ADD_TITLE}</h3>
      ${this.getSectionSelector(stations)}
      <input type="number" id="${DOMStrings.SECTION_ORDER_INPUT}" placeholder="${strings.ORDER}">
      <button id="${DOMStrings.SECTION_ADD_BUTTON}">${strings.ADD}</button><br><br><br>
      ${this.getSectionList(lines[lineIndex].stations)}
    `;
    document.getElementById(DOMStrings.SECTION_MANAGER).innerHTML = sectionManager;
  }

  getSectionSelector(stations) {
    return `
      <select id="${DOMStrings.SECTION_STATION_SELECTOR}">
        ${stations.map(station => `<option>${station}</option>`).join('')}
      </select>
    `;
  }

  getSectionList(stations) {
    return `
      <table id="${DOMStrings.SECTION_LIST_TABLE}">
        ${this.getSectionListHeader()}
        ${stations.map((station, index) => this.getSectionListContent(station, index)).join('')}
      </table>
    `;
  }

  getSectionListHeader() {
    return `
      <tr>
        <th><b>${strings.ORDER}</b></th>
        <th><b>${strings.NAME}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  }

  getSectionListContent(station, index) {
    return `
      <tr>
        <td>${index}</td>
        <td>${station}</td>
        <td><button class="${DOMStrings.SECTION_DELETE_BUTTON}" data-${dataStrings.DATA_INDEX}="${index}">
          ${strings.SECTION_DELETE}</button></td>
      </tr>
    `;
  }

  refreshSectionManager(stations, lines, targetLineName) {
    this.openSectionManager(lines);
    this.openSection(stations, lines, targetLineName);
  }
}

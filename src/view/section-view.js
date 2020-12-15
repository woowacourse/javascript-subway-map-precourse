import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Element, ElementControl } from "./element.js";

export const SectionView = {
  render() {
    this.renderSectionLineMenuButton();

    ElementControl.hideSectionManager();
  },

  renderSectionLineMenuButton() {
    let content = "";

    Line.lines.forEach(({ name }) => {
      content += `
        <button class="section-line-menu-button" data-name="${name}">
          ${name}
        </button>
      `;
    });

    Element.sectionLineMenu.innerHTML = content;
  },

  renderSectionManager(line) {
    this.renderSectionManagerTitle(line);
    this.renderSectionStationSelector();
    this.renderSectionContainerTable(line);

    ElementControl.showSectionManager();
  },

  renderSectionManagerTitle(line) {
    const sectionManagerTitleContent = `${line} 관리`;

    Element.sectionManagerTitle.innerHTML = sectionManagerTitleContent;
  },

  renderSectionStationSelector() {
    let content = "";

    Station.stations.forEach((station) => {
      content += `
        <option value="${station}">${station}</option>
      `;
    });

    Element.sectionStationSelector.innerHTML = content;
  },

  renderSectionContainerTable(line) {
    const stationArray = Line.lines.filter(({ name }) => name === line)[0]
      .stations;
    let content = "";

    for (let i = 0; i < stationArray.length; i++) {
      content += `
        <tr>
          <td style="text-align: center">${i}</td>
          <td>${stationArray[i]}</td>
          <td>
            <button class="section-delete-button" data-name="${stationArray[i]}" data-idx=${i}>
              노선에서 제거
            </button>
          </td>
        </tr>
      `;
    }

    Element.sectionContainer.querySelector(Constant.TBODY).innerHTML = content;
  },
};

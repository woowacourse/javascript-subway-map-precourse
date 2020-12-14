import { MapPrintViewEventDelegator } from '../../eventDelegators';
import { addTemplateToDomInnerHTML } from '../../utils';

export default class SubwayMapMapPrintView {
  constructor(subwayMapViewModel, managerContainer, mapPrintManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.eventDelegator = new MapPrintViewEventDelegator(this, this.subwayMapViewModel);
    this.eventDelegator.bindEvent(mapPrintManagerButton);
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderMapPrintManager() {
    const linesUls = this.renderLinesUls(Object.entries(this.subwayMapViewModel.getLines()));

    addTemplateToDomInnerHTML(this.managerContainer, `<div class="map">${linesUls}</div>`);
  }

  renderLinesUls(lines) {
    return lines
      .map(line => {
        const [lineId, lineInstance] = line;
        return `<h3>${lineId}</h3>
            <ul>${lineInstance._sections
              .map(section => {
                return `<li>${section._stationId}</li>`;
              })
              .join('')}
            </ul>
          `;
      })
      .join('');
  }
}

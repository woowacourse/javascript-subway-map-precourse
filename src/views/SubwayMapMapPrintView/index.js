import { MapPrintViewEventDelegator } from '../../eventDelegators';

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
    this.managerContainer.innerHTML += `
      <div class="map">
      ${linesUls}
      </div>
    `;
  }

  renderLinesUls(lines) {
    return lines
      .map(line => {
        return `<h3>${line[0]}</h3>
            <ul>${line[1]._sections
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

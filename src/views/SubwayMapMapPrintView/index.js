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
    let linesUls = ``;

    lines.map(line => {
      let sectionlis = ``;
      line[1].sections.map(section => {
        sectionlis += `<li>${section.stationId}</li>`;
      });
      let lineUl = `
      <h3>${line[0]}</h3>
      <ul>${sectionlis}</ul>
      `;
      linesUls += lineUl;
    });

    return linesUls;
  }
}

class MapPrintViewEventDelegation {
  constructor(element, mapPrintView, subwayMapViewModel) {
    this.mapPrintView = mapPrintView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  mapPrintManager() {
    this.mapPrintView.resetManagerContainer();
    this.mapPrintView.renderMapPrintManager();
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }
}

export default class SubwayMapMapPrintView {
  constructor(subwayMapViewModel, managerContainer, mapPrintManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.mapPrintManagerButton = mapPrintManagerButton;

    new MapPrintViewEventDelegation(
      this.mapPrintManagerButton,
      this,
      this.subwayMapViewModel,
    );
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderMapPrintManager() {
    const linesUls = this.renderLinesUls(
      Object.entries(this.subwayMapViewModel.getLines()),
    );
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

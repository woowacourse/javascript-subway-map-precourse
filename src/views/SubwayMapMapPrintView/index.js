class MapPrintViewEventDelegation {
  constructor(element, mapPrintView, subwayMapViewModel) {
    this.mapPrintView = mapPrintView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  mapPrintManager() {
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

  renderMapPrintManager() {
    this.managerContainer.innerHTML += `
      <div class="map">
        <p>test</p>
      </div>
    `;
  }
}

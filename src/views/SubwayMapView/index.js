export default class SubwayMapView {
  constructor(subwayMapViewModel, stationManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.stationManagerButton = stationManagerButton;

    this.addEventListenerToStationManagerButton(this);
  }

  addEventListenerToStationManagerButton(self) {
    this.stationManagerButton.addEventListener(
      'click',
      this.renderStationManager.bind(self),
    );
  }

  renderStationManager() {}
}

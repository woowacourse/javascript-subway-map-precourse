import { message } from '../../constants';

export default class SubwayMapView {
  constructor(subwayMapViewModel, managerContainer, stationManagerButton) {
    this.managerContainer = managerContainer;
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

  renderStationManager() {
    this.managerContainer.innerHTML += `
      <p>${message.STATION_NAME}</p>
      <input id="#station-name-input "></input>
      <button id="#station-add-button">${message.ADD_STATION}</button>
      <h2>${message.LIST_OF_STATIONS}</h2>
    `;
  }
}

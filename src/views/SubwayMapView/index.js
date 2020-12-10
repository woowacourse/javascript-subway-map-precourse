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

  addEventListenerToStationAddButton(self) {
    const StationAddButton = document.getElementById('#station-add-button');
    StationAddButton.addEventListener(
      'click',
      this.handleStationAddButton.bind(self),
    );
  }

  handleStationAddButton() {
    const stationId = document.getElementById('#station-name-input').value;
    this.subwayMapViewModel['stations'] = stationId;
  }

  renderStationManager() {
    this.managerContainer.innerHTML += `
      <p>${message.STATION_NAME}</p>
      <input id="#station-name-input"></input>
      <button id="#station-add-button">${message.ADD_STATION}</button>
      <h2>${message.LIST_OF_STATIONS}</h2>
    `;
    this.addEventListenerToStationAddButton(this);

    this.renderStationTable();
  }

  renderStationThead(stationTable) {
    stationTable.innerHTML += `
      <tr>
        <th>${message.STATION_NAME}</th>
        <th>${message.OPTION}</th>
      </tr>
    `;

    return stationTable;
  }

  renderStationTbody(stationTable) {
    stationTable.innerHTML += `
      <tr>
        <td>${message.STATION_NAME}</td>
        <td>${message.OPTION}</td>
      </tr>
    `;

    return stationTable;
  }

  renderStationTable() {
    let stationTable = document.createElement('table');
    stationTable = this.renderStationThead(stationTable);
    stationTable = this.renderStationTbody(stationTable);

    this.managerContainer.appendChild(stationTable);
  }
}

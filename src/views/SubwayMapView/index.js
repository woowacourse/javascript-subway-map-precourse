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
    const stationAddButton = document.getElementById('#station-add-button');
    stationAddButton.addEventListener(
      'click',
      this.handleStationAddButton.bind(self),
    );
  }

  addEventListenerToStationDeleteButtons(self) {
    const stationDeleteButtons = document.getElementsByClassName(
      '.station-delete-button',
    );

    for (let i = 0; i < stationDeleteButtons.length; i++) {
      stationDeleteButtons[i].addEventListener(
        'click',
        this.handleStationDeleteButton.bind(self),
      );
    }
  }

  handleStationAddButton() {
    const stationId = document.getElementById('#station-name-input').value;
    this.subwayMapViewModel.addStation(stationId);
    this.resetStationTable();
    this.renderStationTable(
      Object.entries(this.subwayMapViewModel.getStations()),
    );

    this.addEventListenerToStationDeleteButtons(this);
  }

  handleStationDeleteButton() {
    console.log('call');
  }

  resetStationTable() {
    document.getElementById('#station-table-container').innerHTML = '';
  }

  renderStationManager() {
    this.managerContainer.innerHTML += `
      <p>${message.STATION_NAME}</p>
      <input id="#station-name-input"></input>
      <button id="#station-add-button">${message.ADD_STATION}</button>
      <h2>${message.LIST_OF_STATIONS}</h2>
      <div id="#station-table-container"></div>
    `;
    this.addEventListenerToStationAddButton(this);

    this.renderStationTable([]);
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

  renderStationTbody(stationTable, stations) {
    stations.forEach(stationId => {
      stationTable.innerHTML += `
      <tr>
        <td>${stationId[0]}</td>
        <td>
          <button data-id="${stationId[0]}" class=".station-delete-button">${message.OPTION_REMOVE}</button>
        </td>
      </tr>
    `;
    });

    return stationTable;
  }

  renderStationTable(stations) {
    let stationTable = document.createElement('table');
    stationTable.setAttribute('id', '#station-name-table');
    stationTable = this.renderStationThead(stationTable);
    stationTable = this.renderStationTbody(stationTable, stations);

    document
      .getElementById('#station-table-container')
      .appendChild(stationTable);
  }
}

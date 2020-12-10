import { message } from '../../constants';

export default class SubwayMapStationView {
  constructor(subwayMapViewModel, managerContainer, stationManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.stationManagerButton = stationManagerButton;

    this.addEventListenerToStationManagerButton(this);
  }

  addEventListenerToStationManagerButton(self) {
    this.stationManagerButton.addEventListener(
      'click',
      this.handleStationManagerButton.bind(self),
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

  addEventListenerToStationAddButton(self) {
    const stationAddButton = document.getElementById('#station-add-button');
    stationAddButton.addEventListener(
      'click',
      this.handleStationAddButton.bind(self),
    );
  }

  handleStationManagerButton() {
    this.resetManagerContainer();
    this.renderStationManager();
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

  handleStationDeleteButton(event) {
    this.subwayMapViewModel.deleteStation(event.target.dataset.id);

    this.resetStationTable();
    this.renderStationTable(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
    this.addEventListenerToStationDeleteButtons(this);
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
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

  renderStationTable(stations) {
    const stationThead = this.renderStationThead();
    const stationTbody = this.renderStationTbody(stations);

    const stationTable = `
      <table id="#station-name-table">
      ${stationThead}
      ${stationTbody}
      </table>
    `;

    document.getElementById(
      '#station-table-container',
    ).innerHTML += stationTable;
  }

  renderStationThead() {
    const stationThead = `
      <tr>
        <th>${message.STATION_NAME}</th>
        <th>${message.OPTION}</th>
      </tr>
    `;

    return stationThead;
  }

  renderStationTbody(stations) {
    let stationTbody = ``;
    stations.forEach(stationId => {
      stationTbody += `
      <tr>
        <td>${stationId[0]}</td>
        <td>
          <button data-id="${stationId[0]}" class=".station-delete-button">${message.OPTION_REMOVE}</button>
        </td>
      </tr>
    `;
    });

    return stationTbody;
  }
}

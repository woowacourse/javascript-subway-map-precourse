import { message } from '../../constants';
import { StationViewEventDelegator } from '../../eventDelegators';

export default class SubwayMapStationView {
  constructor(subwayMapViewModel, managerContainer, stationManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.stationManagerButton = stationManagerButton;

    new StationViewEventDelegator(
      this.stationManagerButton,
      this,
      this.subwayMapViewModel,
    );
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  resetStationTable() {
    document.getElementById('#station-table-container').innerHTML = '';
  }

  renderStationManager() {
    this.renderStationInputContainer();
    this.renderStationTableContainer();

    new StationViewEventDelegator(
      document.getElementById('#station-input-container'),
      this,
      this.subwayMapViewModel,
    );
    new StationViewEventDelegator(
      document.getElementById('#station-table-container'),
      this,
      this.subwayMapViewModel,
    );
  }

  renderStationInputContainer() {
    this.managerContainer.innerHTML += `
      <div id="#station-input-container">
        <p>${message.STATION_NAME}</p>
        <input id="#station-name-input" placeholder="${message.STATION_INPUT_PLACEHOLDER}"></input>
        <button id="#station-add-button" data-purpose="addStation">${message.ADD_STATION}</button>
        <h2>${message.LIST_OF_STATIONS}</h2>
      </div>
    `;
  }

  renderStationTableContainer() {
    this.managerContainer.innerHTML += `
      <div id="#station-table-container"></div>
    `;

    this.renderStationTable(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
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
    stations.forEach(station => {
      stationTbody += `
      <tr>
        <td>${station[0]}</td>
        <td>
          <button class=".station-delete-button" data-stationid="${station[0]}" data-purpose="deleteStation">${message.OPTION_DELETE}</button>
        </td>
      </tr>
    `;
    });

    return stationTbody;
  }
}

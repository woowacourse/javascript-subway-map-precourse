import { message } from '../../constants';
import { addTemplateToDomInnerHTML } from '../../utils';
import { StationViewEventDelegator } from '../../eventDelegators';

export default class SubwayMapStationView {
  constructor(subwayMapViewModel, managerContainer, stationManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.eventDelegator = new StationViewEventDelegator(this.subwayMapViewModel);

    this.eventDelegator.bindStationView(this);
    this.eventDelegator.bindEvent(stationManagerButton);
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  resetStationTable() {
    this.managerContainer.querySelector('#station-table-container').innerHTML = '';
  }

  renderStationManager() {
    this.renderStationInputContainer();
    this.renderStationTableContainer();

    this.eventDelegator.bindEvent(this.managerContainer.querySelector('#station-input-container'));
    this.eventDelegator.bindEvent(this.managerContainer.querySelector('#station-table-container'));
  }

  renderStationInputContainer() {
    addTemplateToDomInnerHTML(
      this.managerContainer,
      `
    <div id="station-input-container">
      <p>${message.STATION_NAME}</p>
      <input id="station-name-input" placeholder="${message.STATION_INPUT_PLACEHOLDER}"></input>
      <button id="station-add-button" data-purpose="addStation">${message.ADD_STATION}</button>
      <h2>${message.LIST_OF_STATIONS}</h2>
    </div>
  `,
    );
  }

  renderStationTableContainer() {
    addTemplateToDomInnerHTML(this.managerContainer, `<div id="station-table-container"></div>`);

    this.renderStationTable(Object.entries(this.subwayMapViewModel.getStations()));
  }

  renderStationTable(stations) {
    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#station-table-container'),
      this.combineTheadTbody(this.getStationThead(), this.getStationTbody(stations)),
    );
  }

  combineTheadTbody(stationThead, stationTbody) {
    return `
      <table id="station-name-table">
        ${stationThead}
        ${stationTbody}
      </table>
    `;
  }

  getStationThead() {
    return `
      <tr>
        <th>${message.STATION_NAME}</th>
        <th>${message.OPTION}</th>
      </tr>
      `;
  }

  getStationTbody(stations) {
    return stations
      .map(station => {
        const [stationId] = station;
        return this.getSectionTbodyTr(stationId);
      })
      .join('');
  }

  getSectionTbodyTr(stationId) {
    return `
    <tr>
      <td>${stationId}</td>
      <td>
        <button class="station-delete-button" data-stationid="${stationId}" data-purpose="deleteStation">${message.OPTION_DELETE}</button>
      </td>
    </tr>
  `;
  }
}

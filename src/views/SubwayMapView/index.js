import { message } from '../../constants';

export default class SubwayMapView {
  constructor(
    subwayMapViewModel,
    managerContainer,
    stationManagerButton,
    lineManagerButton,
  ) {
    this.managerContainer = managerContainer;
    this.subwayMapViewModel = subwayMapViewModel;
    this.stationManagerButton = stationManagerButton;
    this.lineManagerButton = lineManagerButton;

    this.addEventListenerToStationManagerButton(this);
    this.addEventListenerToLineManagerButton(this);
  }

  addEventListenerToStationManagerButton(self) {
    this.stationManagerButton.addEventListener(
      'click',
      this.handleStationManagerButton.bind(self),
    );
  }

  addEventListenerToLineManagerButton(self) {
    this.lineManagerButton.addEventListener(
      'click',
      this.handleLineManagerButton.bind(self),
    );
  }

  addEventListenerToStationAddButton(self) {
    const stationAddButton = document.getElementById('#station-add-button');
    stationAddButton.addEventListener(
      'click',
      this.handleStationAddButton.bind(self),
    );
  }

  addEventListenerToLineAddButton(self) {
    const lineAddbutton = document.getElementById('#line-add-button');
    lineAddbutton.addEventListener(
      'click',
      this.handleLineAddButton.bind(self),
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

  handleLineManagerButton() {
    this.resetManagerContainer();
    this.renderLineManager();

    this.addEventListenerToLineAddButton(this);
  }

  handleLineAddButton() {
    const lineObject = {
      lineId: document.getElementById('#line-name-input').value,
      startStation: document.getElementById('#line-start-station-selector')[
        document.getElementById('#line-start-station-selector').selectedIndex
      ].dataset.id,
      endStation: document.getElementById('#line-end-station-selector')[
        document.getElementById('#line-end-station-selector').selectedIndex
      ].dataset.id,
    };

    this.subwayMapViewModel.addLine(lineObject);
    console.log(Object.entries(this.subwayMapViewModel.getLines()));
  }

  resetStationTable() {
    document.getElementById('#station-table-container').innerHTML = '';
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
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

  renderLineTable() {}

  renderLineThead() {
    const lineThead = `
      <tr>
        <th>${message.LINE_NAME}</th>
        <th>${message.START_STATION}</th>
        <th>${message.END_STATION}</th>
      </tr>
    `;

    return lineThead;
  }

  renderLineManager() {
    this.renderLineNameInput();
    this.renderStartStationSelector(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
    this.renderEndStationSelector(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
    this.renderLineAddButton();
  }

  renderLineNameInput() {
    this.managerContainer.innerHTML = `
      <p>${message.LINE_NAME}</p>
      <input id="#line-name-input"></input>
    `;
  }

  renderStartStationSelector(stations) {
    let selectorOptions = ``;

    stations.forEach(stationId => {
      selectorOptions += `
        <option data-id="${stationId[0]}">${stationId[0]}</option>
      `;
    });

    this.managerContainer.innerHTML += `
    <div>
      <p>${message.START_STATION}</p>
      <select id="#line-start-station-selector">${selectorOptions}</select>
    </div>
  `;
  }

  renderEndStationSelector(stations) {
    let selectorOptions = ``;

    stations.forEach(stationId => {
      selectorOptions += `
        <option data-id="${stationId[0]}">${stationId[0]}</option>
      `;
    });

    this.managerContainer.innerHTML += `
    <div>
      <p>${message.END_STATION}</p>
      <select id="#line-end-station-selector">${selectorOptions}</select>
    </div>
  `;
  }
  renderLineAddButton() {
    this.managerContainer.innerHTML += `
      <button id="#line-add-button">${message.LINE_ADD_BUTTON}</button>
    `;
  }
}

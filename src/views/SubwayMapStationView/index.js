import { message } from '../../constants';

class StationViewEventDelegation {
  constructor(element, stationView, subwayMapViewModel) {
    this.stationView = stationView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }

  stationManager() {
    this.stationView.resetManagerContainer();
    this.stationView.renderStationManager();
  }

  // addLine() {
  //   const lineObject = {
  //     lineId: document.getElementById('#line-name-input').value,
  //     startStation: document.getElementById('#line-start-station-selector')[
  //       document.getElementById('#line-start-station-selector').selectedIndex
  //     ].dataset.id,
  //     endStation: document.getElementById('#line-end-station-selector')[
  //       document.getElementById('#line-end-station-selector').selectedIndex
  //     ].dataset.id,
  //   };

  //   this.subwayMapViewModel.addLine(lineObject);
  //   this.lineView.resetLineTable();
  //   this.lineView.renderLineTable(
  //     Object.entries(this.subwayMapViewModel.getLines()),
  //   );
  // }

  // deleteLine(dataSet) {
  //   this.subwayMapViewModel.deleteLine(dataSet.lineid);
  //   this.lineView.resetLineTable();
  //   this.lineView.renderLineTable(
  //     Object.entries(this.subwayMapViewModel.getLines()),
  //   );
  // }
}

export default class SubwayMapStationView {
  constructor(subwayMapViewModel, managerContainer, stationManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.stationManagerButton = stationManagerButton;

    // this.addEventListenerToStationManagerButton(this);
    new StationViewEventDelegation(
      this.stationManagerButton,
      this.this.subwayMapViewModel,
    );
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
    this.addEventListenerToStationAddButton(this);
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

    this.renderStationTable(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
  }

  // renderStationInputContainer() {

  // }

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
          <button data-id="${stationId[0]}" class=".station-delete-button">${message.OPTION_DELETE}</button>
        </td>
      </tr>
    `;
    });

    return stationTbody;
  }
}

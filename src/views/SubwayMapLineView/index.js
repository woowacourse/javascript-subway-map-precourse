import { message } from '../../constants';

export default class SubwayMapLineView {
  constructor(subwayMapViewModel, managerContainer, lineManagerButton) {
    this.managerContainer = managerContainer;
    this.subwayMapViewModel = subwayMapViewModel;
    this.lineManagerButton = lineManagerButton;

    this.addEventListenerToLineManagerButton(this);
  }

  addEventListenerToLineManagerButton(self) {
    this.lineManagerButton.addEventListener(
      'click',
      this.handleLineManagerButton.bind(self),
    );
  }

  addEventListenerToLineAddButton(self) {
    const lineAddbutton = document.getElementById('#line-add-button');
    lineAddbutton.addEventListener(
      'click',
      this.handleLineAddButton.bind(self),
    );
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

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderLineTable(lines) {
    const lineThead = this.renderLineThead();
    const lineTbody = this.renderLineTbody(lines);

    const lineTable = `
      <table id="#line-name-table">
        ${lineThead}
        ${lineTbody}
      </table>
    `;
  }

  renderLineThead() {
    const lineThead = `
      <tr>
        <th>${message.LINE_NAME}</th>
        <th>${message.START_STATION}</th>
        <th>${message.END_STATION}</th>
        <th>${message.OPTION}</th>
      </tr>
    `;

    return lineThead;
  }

  renderLineTbody(lines) {
    let lineTbody = ``;
    lines.forEach(stationId => {
      lineTbody += `
      <tr>
        <td>${stationId[0]}</td>
        <td>${stationId[1].startStation}</td>
        <td>${stationId[1].endStation}
        <td>
          <button data-id="${stationId[0]}" class=".line-delete-button">${message.OPTION_REMOVE}</button>
        </td>
      </tr>
    `;
    });

    return lineTbody;
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
    this.renderLineTableContainer();
  }

  renderLineTableContainer() {
    this.managerContainer.innerHTML += `
      <h2>${message.LIST_OF_LINES}</h2>
      <div id="#line-table-container"></div>
    `;
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

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
    this.resetLineTable();
    this.renderLineTable(Object.entries(this.subwayMapViewModel.getLines()));
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  resetLineTable() {
    document.getElementById('#line-table-container').innerHTML = '';
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
    this.renderLineTable([]);
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

  renderLineTableContainer() {
    this.managerContainer.innerHTML += `
      <h2>${message.LIST_OF_LINES}</h2>
      <div id="#line-table-container"></div>
    `;
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

    document.getElementById('#line-table-container').innerHTML += lineTable;
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
    lines.forEach(line => {
      lineTbody += `
      <tr>
        <td>${line[0]}</td>
        <td>${line[1].startStation}</td>
        <td>${line[1].endStation}
        <td>
          <button data-id="${line[0]}" class=".line-delete-button">${message.OPTION_DELETE}</button>
        </td>
      </tr>
    `;
    });

    return lineTbody;
  }
}

import { message } from '../../constants';
import { LineViewEventDelegator } from '../../eventDelegators';

export default class SubwayMapLineView {
  constructor(subwayMapViewModel, managerContainer, lineManagerButton) {
    this.managerContainer = managerContainer;
    this.subwayMapViewModel = subwayMapViewModel;
    this.lineManagerButton = lineManagerButton;

    new LineViewEventDelegator(
      lineManagerButton,
      this,
      this.subwayMapViewModel,
    );
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  resetLineTable() {
    document.getElementById('#line-table-container').innerHTML = '';
  }

  renderLineManager() {
    this.renderLineInputContainer();
    this.renderLineTableContainer();
    new LineViewEventDelegator(
      document.getElementById('#line-add-button'),
      this,
      this.subwayMapViewModel,
    );
    new LineViewEventDelegator(
      document.getElementById('#line-table-container'),
      this,
      this.subwayMapViewModel,
    );
  }

  renderLineInputContainer() {
    this.managerContainer.innerHTML += `
      <div id="line-input-container"></div>
    `;
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
    document.getElementById('line-input-container').innerHTML = `
      <p>${message.LINE_NAME}</p>
      <input id="#line-name-input" placeholder="${message.LINE_INPUT_PLACEHOLDER}"></input>
    `;
  }

  renderStartStationSelector(stations) {
    const selectorOptions = stations
      .map(station => {
        let [stationId] = station;
        return `<option data-id="${stationId}">${stationId}</option>`;
      })
      .join('');

    document.getElementById('line-input-container').innerHTML += `
    <div>
      <p>${message.START_STATION}</p>
      <select id="#line-start-station-selector">${selectorOptions}</select>
    </div>
  `;
  }

  renderEndStationSelector(stations) {
    const selectorOptions = stations
      .map(station => {
        let [stationId] = station;
        return `<option data-id="${stationId}">${stationId}</option>`;
      })
      .join('');

    document.getElementById('line-input-container').innerHTML += `
    <div>
      <p>${message.END_STATION}</p>
      <select id="#line-end-station-selector">${selectorOptions}</select>
    </div>
  `;
  }

  renderLineAddButton() {
    document.getElementById('line-input-container').innerHTML += `
      <button id="#line-add-button" data-purpose="addLine">${message.LINE_ADD_BUTTON}</button>
    `;
  }

  renderLineTableContainer() {
    this.managerContainer.innerHTML += `
      <h2>${message.LIST_OF_LINES}</h2>
      <div id="#line-table-container"></div>
    `;

    this.renderLineTable(Object.entries(this.subwayMapViewModel.getLines()));
  }

  renderLineTable(lines) {
    const [lineThead, lineTbody] = [
      this.getLineThead(),
      this.getLineTbody(lines),
    ];

    const lineTable = `
      <table id="#line-name-table">
        ${lineThead}
        ${lineTbody}
      </table>
    `;

    document.getElementById('#line-table-container').innerHTML += lineTable;
  }

  getLineThead() {
    const lineThead = `
      <tr>
        <th>${message.LINE_NAME}</th>
        <th>${message.START_STATION}역</th>
        <th>${message.END_STATION}역</th>
        <th>${message.OPTION}</th>
      </tr>
    `;

    return lineThead;
  }

  getLineTbody(lines) {
    let lineTbody = ``;
    lines.forEach(line => {
      lineTbody += `
      <tr>
        <td>${line[0]}</td>
        <td>${line[1].sections[0].stationId}</td>
        <td>${line[1].sections[line[1].sections.length - 1].stationId}
        <td>
          <button data-lineid="${
            line[0]
          }" data-purpose="deleteLine" class=".line-delete-button">${
        message.OPTION_DELETE
      }</button>
        </td>
      </tr>
    `;
    });

    return lineTbody;
  }
}

import { message } from '../../constants';
import { LineViewEventDelegator } from '../../eventDelegators';

export default class SubwayMapLineView {
  constructor(subwayMapViewModel, managerContainer, lineManagerButton) {
    this.managerContainer = managerContainer;
    this.subwayMapViewModel = subwayMapViewModel;
    this.lineManagerButton = lineManagerButton;
    this.eventDelegator = new LineViewEventDelegator(this, this.subwayMapViewModel);
    this.eventDelegator.bindEvent(this.lineManagerButton);
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
    this.eventDelegator.bindEvent(document.getElementById('#line-add-button'));
    this.eventDelegator.bindEvent(document.getElementById('#line-table-container'));
  }

  renderLineInputContainer() {
    this.managerContainer.innerHTML += `
      <div id="line-input-container"></div>
    `;
    this.renderLineNameInput();
    this.renderStartStationSelector(Object.entries(this.subwayMapViewModel.getStations()));
    this.renderEndStationSelector(Object.entries(this.subwayMapViewModel.getStations()));
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
    document.getElementById('#line-table-container').innerHTML += this.combineTheadTbody(
      this.getLineThead(),
      this.getLineTbody(lines),
    );
  }

  combineTheadTbody(lineThead, lineTbody) {
    return `
      <table id="#line-name-table">
        ${lineThead}
        ${lineTbody}
      </table>
    `;
  }

  getLineThead() {
    return `
      <tr>
        <th>${message.LINE_NAME}</th>
        <th>${message.START_STATION}역</th>
        <th>${message.END_STATION}역</th>
        <th>${message.OPTION}</th>
      </tr>
    `;
  }

  getLineTbody(lines) {
    return lines
      .map(line => {
        return this.getLineTbodyTr(line);
      })
      .join('');
  }

  getLineTbodyTr(line) {
    const [lineId, lineInstance] = line;
    return `
    <tr>
      <td>${lineId}</td>
      <td>${lineInstance.sections[0].stationId}</td>
      <td>${lineInstance.sections[lineInstance.sections.length - 1].stationId}
      <td>
        <button data-lineid="${line[0]}" data-purpose="deleteLine" class=".line-delete-button">${
      message.OPTION_DELETE
    }</button>
      </td>
    </tr>
  `;
  }
}

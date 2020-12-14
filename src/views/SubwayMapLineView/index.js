import { LineViewEventDelegator } from '../../eventDelegators';
import { message } from '../../constants';
import { addTemplateToDomInnerHTML } from '../../utils';

export default class SubwayMapLineView {
  constructor(subwayMapViewModel, managerContainer, lineManagerButton) {
    this.managerContainer = managerContainer;
    this.subwayMapViewModel = subwayMapViewModel;
    this.eventDelegator = new LineViewEventDelegator(this.subwayMapViewModel);

    this.eventDelegator.bindLineView(this);
    this.eventDelegator.bindEvent(lineManagerButton);
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  resetLineTable() {
    this.managerContainer.querySelector('#line-table-container').innerHTML = '';
  }

  renderLineManager() {
    this.renderLineInputContainer();
    this.renderLineTableContainer();
    this.eventDelegator.bindEvent(this.managerContainer.querySelector('#line-add-button'));
    this.eventDelegator.bindEvent(this.managerContainer.querySelector('#line-table-container'));
  }

  renderLineInputContainer() {
    addTemplateToDomInnerHTML(this.managerContainer, `<div id="line-input-container"></div>`);

    this.renderLineNameInput();
    this.renderStartStationSelector(Object.entries(this.subwayMapViewModel.getStations()));
    this.renderEndStationSelector(Object.entries(this.subwayMapViewModel.getStations()));
    this.renderLineAddButton();
  }

  renderLineNameInput() {
    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#line-input-container'),
      `<p>${message.LINE_NAME}</p>
      <input id="line-name-input" placeholder="${message.LINE_INPUT_PLACEHOLDER}"></input>`,
    );
  }

  renderStartStationSelector(stations) {
    const selectorOptions = stations
      .map(station => {
        let [stationId] = station;
        return `<option data-id="${stationId}">${stationId}</option>`;
      })
      .join('');

    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#line-input-container'),
      `<div id="line-start-station-selector-container">
        <p>${message.START_STATION}</p>
        <select id="line-start-station-selector">${selectorOptions}</select>
      </div>`,
    );
  }

  renderEndStationSelector(stations) {
    const selectorOptions = stations
      .map(station => {
        let [stationId] = station;
        return `<option data-id="${stationId}">${stationId}</option>`;
      })
      .join('');

    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#line-input-container'),
      `<div id="line-end-station-selector-container">
        <p>${message.END_STATION}</p>
        <select id="line-end-station-selector">${selectorOptions}</select>
      </div>`,
    );
  }

  renderLineAddButton() {
    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#line-input-container'),
      `<button id="line-add-button" data-purpose="addLine">${message.LINE_ADD_BUTTON}</button>`,
    );
  }

  renderLineTableContainer() {
    addTemplateToDomInnerHTML(
      this.managerContainer,
      `<h2>${message.LIST_OF_LINES}</h2>
      <div id="line-table-container"></div>`,
    );
    this.renderLineTable(Object.entries(this.subwayMapViewModel.getLines()));
  }

  renderLineTable(lines) {
    addTemplateToDomInnerHTML(
      this.managerContainer.querySelector('#line-table-container'),
      this.combineTheadTbody(this.getLineThead(), this.getLineTbody(lines)),
    );
  }

  combineTheadTbody(lineThead, lineTbody) {
    return `
      <table id="line-name-table">
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
      <td>${lineInstance._sections[0]._stationId}</td>
      <td>${lineInstance._sections[lineInstance._sections.length - 1]._stationId}
      <td>
        <button data-lineid="${line[0]}" data-purpose="deleteLine" class="line-delete-button">${
      message.OPTION_DELETE
    }</button>
      </td>
    </tr>
  `;
  }
}

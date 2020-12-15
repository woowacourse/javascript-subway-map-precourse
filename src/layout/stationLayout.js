/**
 * 지하철 역 관리 레이아웃
 */

import PageLayout from './pageLayout.js';
import CommonUtils from '../common/utils.js';
import CustomError from '../common/customError.js';
import {
  STATION_MANAGER_BUTTON,
  STATION_INPUT_PLACEHOLDER,
  STATION_INPUT_TITLE,
  STATION_INPUT_ADD_BUTTON,
  STATION_RESULT_TITLE,
  STATION_TABLE_TD_NAME,
  COMMON_DELETE,
  COMMON_TABLE_TD_SETTING,
} from '../common/constants.js';
export default class StationLayout extends PageLayout {
  constructor(controller) {
    super(controller);
    this.elements = this.createElements(); // elemenet와 Child 저장
    this.rowTemplate = this.createRowTemplate();
    this.rendered = this.$render(this.elements.section);
  }

  // element 구조를 설정
  createElements() {
    const elements = super.$createCommonElements();
    this.$appendChildElement(
      elements.section,
      'inputContainer',
      this.$createInputContainer(),
    );
    this.$appendChildElement(
      elements.section,
      'resultContainer',
      this.$createResultContainer(),
    );

    return elements;
  }

  createManagerButton() {
    return this.createElement({
      tag: 'button',
      id: 'station-manager-button',
      innerHTML: STATION_MANAGER_BUTTON,
      eventListener: { click: [() => this.handleManagerButton()] },
    });
  }

  createInput() {
    return this.createElement({
      tag: 'input',
      id: 'station-name-input',
      placeholder: STATION_INPUT_PLACEHOLDER,
    });
  }

  createInputTitle() {
    return this.createElement({
      tag: 'h3',
      innerHTML: STATION_INPUT_TITLE,
    });
  }

  createInputAddButton() {
    return this.createElement({
      tag: 'button',
      id: 'station-add-button',
      innerHTML: STATION_INPUT_ADD_BUTTON,
      eventListener: { click: [() => this.handleAddButton()] },
    });
  }

  createResultTitle() {
    return this.createElement({
      tag: 'h2',
      innerHTML: STATION_RESULT_TITLE,
    });
  }

  createResultTable() {
    return this.createElement({
      tag: 'table',
      innerHTML: `<thead><tr><th>${STATION_TABLE_TD_NAME}</th><th>${COMMON_TABLE_TD_SETTING}</th></tr></thead><tbody></tbody>`,
    });
  }

  createDeleteButton() {
    return this.createElement({
      tag: 'button',
      innerHTML: COMMON_DELETE,
      classList: ['station-delete-button'],
      eventListener: { click: [e => this.handleDeleteButton(e.target)] },
    });
  }

  $createInputContainer() {
    const element = this.createElement({ tag: 'article' });
    const title = this.$createElementNode(this.createInputTitle());
    const input = this.$createElementNode(this.createInput());
    const button = this.$createElementNode(this.createInputAddButton());

    return this.$createElementNode(element, { title, input, button });
  }

  $createResultContainer() {
    const element = this.createElement({ tag: 'article' });
    const title = this.$createElementNode(this.createResultTitle());
    const table = this.$createElementNode(this.createResultTable());

    return this.$createElementNode(element, { title, table });
  }

  // override
  createRowTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'station-row',
      innerHTML: '<tr><td></td><td></td></tr>',
    });
  }

  // override
  refreshResultData() {
    this.rendered.querySelector('tbody').replaceWith(this.loadTableData());
  }

  loadTableData() {
    const stationList = this.controller.getStationListAll();
    const tableRows = stationList.map(station => this.createRow(station.name));
    const tbody = this.createElement({ tag: 'tbody' });
    tbody.append(...tableRows);

    return tbody;
  }

  createRow(stationName) {
    const clone = this.rowTemplate.content.cloneNode(true);
    const td = clone.querySelectorAll('td');
    clone.querySelector('tr').dataset.stationName = stationName;
    td[0].textContent = stationName;
    td[1].append(this.createDeleteButton());

    return clone;
  }

  handleDeleteButton(target) {
    const tr = target.parentElement.parentElement;
    try {
      this.controller.deleteStationData(tr.dataset.stationName);
    } catch (err) {
      err.alertUser();
    }
    this.refreshResultData();
  }

  // override
  handleAddButton() {
    const input = this.controller.getInputFromUser(this);
    try {
      this.controller.insertStationData(input); // TODO: model 클래스만들어서 상속 -> 이 메소드 부모로빼기
    } catch (err) {
      err.alertUser();
    }
    this.refreshResultData();
    this.clearInput();
  }

  // TODO: 부모로 빼기
  clearInput() {
    this.rendered.querySelector('input').value = '';
  }
}

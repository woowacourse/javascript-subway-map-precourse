/**
 * 지하철 역 관리 레이아웃
 */

import PageLayout from './pageLayout.js';

export default class StationLayout extends PageLayout {
  createManagerButton() {
    const stationManagerButton = document.createElement('button');
    stationManagerButton.id = 'station-manager-button';
    stationManagerButton.innerHTML = '1. 역 관리';
    // TODO: 이거 공통클래스로 뺄수있지않나?
    stationManagerButton.addEventListener('click', () =>
      this.handleManagerButton(),
    );

    return stationManagerButton;
  }

  createSection() {
    const stationSection = document.createElement('section');
    stationSection.id = 'station-section';

    return stationSection;
  }

  createInput() {
    const stationNameInput = document.createElement('input');
    stationNameInput.id = 'station-name-input';
    stationNameInput.placeholder = '역 이름을 입력해주세요.';

    return stationNameInput;
  }

  createInputTitle() {
    const stationNameTitle = document.createElement('h3');
    stationNameTitle.innerHTML = '역 이름';

    return stationNameTitle;
  }

  createInputAddButton() {
    const stationAddButton = document.createElement('button');
    stationAddButton.id = 'station-add-button';
    stationAddButton.innerHTML = '역 추가';
    stationAddButton.addEventListener('click', () => this.handleAddButton());

    return stationAddButton;
  }

  createInputContainer() {
    const stationNameContainer = document.createElement('article');

    stationNameContainer.append(
      this.createInputTitle(),
      this.createInput(),
      this.createInputAddButton(),
    );

    return stationNameContainer;
  }

  createResultContainer() {
    const stationResultContainer = document.createElement('article');
    const stationResultTitle = this.createResultTitle();
    const stationResultTable = this.createResultTable();

    stationResultContainer.append(stationResultTitle, stationResultTable);

    return stationResultContainer;
  }

  createResultTitle() {
    const stationResultTitle = document.createElement('h2');
    stationResultTitle.innerHTML = '🚉 지하철 역 목록';

    return stationResultTitle;
  }

  createResultTable() {
    const stationResultTable = document.createElement('table');
    stationResultTable.innerHTML =
      '<thead><tr><th>역이름</th><th>설정</th></tr></thead>';

    return stationResultTable;
  }

  addRow(stationName) {
    // TODO: 자식구조도 object로 돌릴수있겠는데?
    // TODO: controller 로 옮기기
    // TODO: VDOM 쓰면 한번에 append하지않는방향으로..
    const row = this.elements.resultContainer
      .querySelector('table')
      .insertRow();
    row.insertCell(0).innerHTML = stationName;
    row.insertCell(
      1,
    ).innerHTML = `<button class='.station-delete-button'>삭제</button>`;
  }

  // override
  handleAddButton() {
    const input = this.controller.getInputFromUser(this);
    console.log(input);
    this.addRow(input);
    this.controller.addStationData(input);
    this.clearInput();
  }

  clearInput() {
    this.elements.inputContainer.querySelector('input').value = '';
  }

  // override
  createElements() {
    const managerButton = this.createManagerButton();
    const section = this.createSection();
    const inputContainer = this.createInputContainer();
    const resultContainer = this.createResultContainer();

    return { managerButton, section, inputContainer, resultContainer };
  }

  // override
  displaySavedData() {
    // TODO: storageData 비동기?
    const stationList = this.controller.modelList.station.getList();
    for (const station of stationList) {
      this.addRow(station);
    }
  }

  // override
  buildLayout() {
    const { section, inputContainer, resultContainer } = this.elements;
    section.append(inputContainer, resultContainer);
  }
}

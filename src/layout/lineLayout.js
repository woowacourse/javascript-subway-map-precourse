import PageLayout from './pageLayout.js';
/**
 * 지하철 노선 관련 클래스
 */

export default class LineLayout extends PageLayout {
  // override
  createElements() {
    const managerButton = this.createManagerButton();
    const section = this.createSection();
    const inputContainer = this.createInputContainer();
    const resultContainer = this.createResultContainer();

    return { managerButton, section, inputContainer, resultContainer };
  }

  // override
  buildLayout() {
    const { section, inputContainer, resultContainer } = this.elements;
    section.append(inputContainer, resultContainer);
  }

  createManagerButton() {
    const lineManagerButton = document.createElement('button');
    lineManagerButton.id = 'line-manager-button';
    lineManagerButton.innerHTML = '2. 노선 관리';
    lineManagerButton.addEventListener('click', () =>
      this.handleManagerButton(),
    );

    return lineManagerButton;
  }

  createSection() {
    const lineSection = document.createElement('section');
    lineSection.id = 'line-section';

    return lineSection;
  }

  createResultContainer() {
    const lineResultContainer = document.createElement('article');
    lineResultContainer.append(
      this.createResultTitle(),
      this.createResultTable(),
    );

    return lineResultContainer;
  }

  createResultTitle() {
    const title = document.createElement('h2');
    title.innerHTML = '🚉 지하철 노선 목록';

    return title;
  }

  createResultTable() {
    const lineResultTable = document.createElement('table');
    lineResultTable.innerHTML =
      '<thead><tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th></tr></thead>';

    return lineResultTable;
  }

  createInputTitle() {
    const lineNameTitle = document.createElement('h3');
    lineNameTitle.innerHTML = '노선 이름';

    return lineNameTitle;
  }

  createInput() {
    const lineNameInput = document.createElement('input');
    lineNameInput.id = 'line-name-input';
    lineNameInput.placeholder = '노선 이름을 입력해주세요';

    return lineNameInput;
  }

  createStationSubtitle(text) {
    const subtitle = document.createElement('h3'); // TODO: label로 바꾸기
    subtitle.innerHTML = text;

    return subtitle;
  }

  createStationSelector(position) {
    const stationSelector = document.createElement('select');
    stationSelector.id = `line-${position}-station-selector`;
    stationSelector.name = position;

    return stationSelector;
  }

  createAddButton() {
    const lineAddButton = document.createElement('button');
    lineAddButton.id = 'line-add-button';
    lineAddButton.innerHTML = '노선 추가';
    lineAddButton.addEventListener('click', () => this.handleAddButton());

    return lineAddButton;
  }

  insertRow(lineName, start, end) {
    const row = this.elements.resultContainer
      .querySelector('table')
      .insertRow();
    row.dataset.lineName = lineName;
    row.dataset.lineStart = start;
    row.dataset.lineEnd = end;
    row.insertCell(0).innerHTML = lineName;
    row.insertCell(1).innerHTML = start;
    row.insertCell(2).innerHTML = end;
    row.insertCell(3).innerHTML = '<button>삭제</button>';
    // row.insertCell(1).append(this.createDeleteButton());
  }

  getSelectedOption(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
  }

  // override
  handleAddButton() {
    const line = this.controller.getInputFromUser(this);
    const { inputContainer } = this.elements;
    console.log(`line line: ${line}, inputContainer: ${inputContainer}`);
    const start = this.getSelectedOption(
      inputContainer.querySelector(`select[name='start']`),
    );
    const end = this.getSelectedOption(
      inputContainer.querySelector(`select[name='end']`),
    );

    // TODO: querySelector말고 다른 방법은 없나?
    // const selectors = this.elements.inputContainer.querySelectorAll('select');
    this.insertRow(line, start.value, end.value);
    this.controller.insertLineData(line, start.value, end.value);
  }

  // override
  displaySavedData() {
    const start = this.elements.inputContainer.querySelector(
      `select[name='start']`,
    );
    const end = this.elements.inputContainer.querySelector(
      `select[name='end']`,
    );
    const stationList = this.controller.modelList.station.getList();
    // FIXME: 새로 역을 추가 후 탭을 이동하면 추가한 역이 나오지 않음
    // FIXME: displaySavedData를 create시말고 tab show할때로 옮기기

    // TODO: 예외로 등록 ) 이미 노선이 등록된 경우 옵션에 추가하지 않음
    for (const station of stationList) {
      start.insertAdjacentHTML('beforeend', `<option>${station.name}</option>`);
      end.insertAdjacentHTML('beforeend', `<option>${station.name}</option>`);
    }

    // TODO: 데이터 테이블에 추가하기 -> 데이터 테이블 업데이트 함수 만들어서 그냥 불러오기
  }

  createInputContainer() {
    const lineNameContainer = document.createElement('article');
    lineNameContainer.append(
      this.createInputTitle(),
      this.createInput(),
      this.createStationSubtitle('상행 종점'),
      this.createStationSelector('start'),
      this.createStationSubtitle('하행 종점'),
      this.createStationSelector('end'),
      this.createAddButton(),
    );

    return lineNameContainer;
  }
}

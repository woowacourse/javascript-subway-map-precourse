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
    const subtitle = document.createElement('h3');
    subtitle.innerHTML = text;

    return subtitle;
  }

  createStationSelector(position) {
    const stationSelector = document.createElement('select');
    stationSelector.id = `line-${position}-station-selector`;

    return stationSelector;
  }

  createAddButton() {
    const lineAddButton = document.createElement('button');
    lineAddButton.id = 'line-add-button';
    lineAddButton.innerHTML = '노선 추가';

    return lineAddButton;
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

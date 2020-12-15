import PageLayout from './pageLayout.js';
/**
 * 지하철 노선 관련 뷰 클래스
 */

export default class LineLayout extends PageLayout {
  constructor(controller) {
    super(controller);
    this.elements = this.createElements(); // elemenet와 Child 저장
    this.rowTemplate = this.createRowTemplate();
    this.optionTemplate = this.createOptionTemplate();
    this.rendered = this.$render(this.elements.section);
  }

  // override
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
      id: 'line-manager-button',
      innerHTML: '2. 노선 관리',
      eventListener: { click: [() => this.handleManagerButton()] },
    });
  }

  createInput() {
    return this.createElement({
      tag: 'input',
      id: 'line-name-input',
      placeholder: '노선 이름을 입력해주세요',
    });
  }

  createInputTitle() {
    return this.createElement({
      tag: 'h3',
      innerHTML: '노선 이름',
    });
  }

  createInputAddButton() {
    return this.createElement({
      tag: 'button',
      id: 'line-add-button',
      innerHTML: '노선 추가',
      eventListener: { click: [() => this.handleAddButton()] },
    });
  }

  createSelectorTitle(text) {
    return this.createElement({
      tag: 'h3',
      innerHTML: text,
    });
  }

  createStationSelector(position) {
    return this.createElement({
      tag: 'select',
      id: `line-${position}-station-selector`,
      name: position,
    });
  }

  createResultTitle() {
    return this.createElement({
      tag: 'h2',
      innerHTML: '🚉 지하철 노선 목록',
    });
  }

  createResultTable() {
    return this.createElement({
      tag: 'table',
      innerHTML:
        '<thead><tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr></thead><tbody></tbody>',
    });
  }

  createDeleteButton() {
    return this.createElement({
      tag: 'button',
      innerHTML: '삭제',
      classList: ['line-delete-button'],
      eventListener: { click: [e => this.handleDeleteButton(e.target)] },
    });
  }

  $createSlectorContainer(text, position) {
    const container = this.createElement({ tag: 'div' });
    const title = this.$createElementNode(this.createSelectorTitle(text));
    const selector = this.$createElementNode(
      this.createStationSelector(position),
    );

    return this.$createElementNode(container, { title, selector });
  }

  $createInputContainer() {
    const element = this.createElement({ tag: 'article' });
    const title = this.$createElementNode(this.createInputTitle());
    const input = this.$createElementNode(this.createInput());
    const startSelector = this.$createSlectorContainer('상행 종점', 'start');
    const endSelector = this.$createSlectorContainer('하행 종점', 'end');
    const button = this.$createElementNode(this.createInputAddButton());

    return this.$createElementNode(element, {
      title,
      input,
      startSelector,
      endSelector,
      button,
    });
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
      id: 'line-row',
      innerHTML: '<tr><td></td><td></td><td></td><td></td></tr>',
    });
  }

  // override
  refreshResultData() {
    const [start, end] = this.rendered.querySelectorAll('select');
    start.replaceWith(this.loadSelectorData('start'));
    end.replaceWith(this.loadSelectorData('end'));
    this.rendered.querySelector('tbody').replaceWith(this.loadTableData());
  }

  loadSelectorData(position) {
    const stationList = this.controller.modelList.station.getList();
    const options = stationList.map(station => this.createOption(station.name));
    const selector = this.createStationSelector(position);
    selector.append(...options);

    return selector;
  }

  loadTableData() {
    const lineList = this.controller.getLineListAll();
    const tableRows = lineList.map(line => this.createRow(line));
    const tbody = this.createElement({ tag: 'tbody' });
    tbody.append(...tableRows);

    return tbody;
  }

  getLineAndLastStations(lineArray) {
    return [
      lineArray[0].line,
      lineArray[0].name,
      lineArray[lineArray.length - 1].name,
    ];
  }

  createRow(lineArray) {
    const [lineName, lineStart, lineEnd] = this.getLineAndLastStations(
      lineArray,
    );
    const clone = this.rowTemplate.content.cloneNode(true);
    const td = clone.querySelectorAll('td');
    const tr = clone.querySelector('tr');
    tr.dataset.lineName = lineName;
    tr.dataset.lineStart = lineStart;
    tr.dataset.lineEnd = lineEnd;
    td[0].textContent = lineName;
    td[1].textContent = lineStart;
    td[2].textContent = lineEnd;
    td[3].append(this.createDeleteButton());

    return clone;
  }

  handleDeleteButton(target) {
    const tr = target.parentElement.parentElement;
    this.controller.deleteLineData(tr.dataset.lineName);
    this.refreshResultData();
  }

  // override
  handleAddButton() {
    const line = this.controller.getInputFromUser(this);
    const start = this.getSelectedOption(
      this.rendered.querySelector(`select[name='start']`),
    );
    const end = this.getSelectedOption(
      this.rendered.querySelector(`select[name='end']`),
    );
    this.controller.insertLineData(line, start.value, end.value);
    this.refreshResultData();
    // this.clearInput(); // TODO: 넣기
  }
}

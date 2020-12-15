import TableUtils from './table_utils.js';
import DomUtils from './dom_utils.js';
import CommonUtils from './common_utils.js';
import SelectUtils from './select_utils.js';

export default class ManageSection {
  constructor() {
    this.setPrivateVariables();
    this.setConst();
    this.getLocalStorage();
    this.initPage();
  }

  setPrivateVariables() {
    this._privateTableUtils = new TableUtils();
    this._privateDomUtils = new DomUtils();
    this._privateCommonUtils = new CommonUtils();
    this._privateSelectUtils = new SelectUtils();
  }

  setConst() {
    this.ARTICLE_NAME = 'sectionArticle';
    this.SELECT_LINE_SECTION = 'selectLineSection';
    this.MANAGE_LINE_SECTION = 'manageLineSection';
    this.LINE_TABLE_SECTION = 'sectionManageArea';

    this.SELECT_LINE_TITLE_TAG = 'h3';
    this.SELECT_LINE_TITLE = '구간을 수정할 노선을 선택해주세요';
    this.MANAGE_LINE_TITLE_TAG = 'h3';
    this.MANAGE_LINE_TITLE = ' 관리';
    this.ADD_SECTION_TITLE_TAG = 'h4';
    this.ADD_SECTION_TITLE = '구간 등록';
    this.SECTION_ORDER_INPUT_PLACEHOLDER = '순서';
    this.SECTION_DELETE_TEXT = '노선에서 제거';

    this.SELECT_LINE_BUTTON_CLASS = 'section-line-menu-button';
    this.DELETE_BUTTON_CLASS = 'section-delete-button';

    this.SECTION_STATION_SELECTOR = 'section-station-selector';
    this.SECTION_ORDER_INPUT = 'section-order-input';
    this.ADD_BUTTON = 'section-add-button';
    this.ADD_BUTTON_TEXT = '등록';
  }

  getLocalStorage() {
    this._lineList = this._privateCommonUtils.getLocalStorageLine();
    this._stationList = this._privateCommonUtils.getLocalStorageStation();
  }

  initPage() {
    this.createSelectLineSection();
    this.createManageLineSection();
    this.createManageLineSectionTable();
  }

  createSelectLineSection() {
    this._privateCommonUtils.createDiv(this.ARTICLE_NAME, this.SELECT_LINE_SECTION);
    this._privateCommonUtils.createTitle(this.SELECT_LINE_TITLE_TAG, this.SELECT_LINE_TITLE, this.SELECT_LINE_SECTION);
    this.createLineButtons();
  }
  
  createLineButtons() {
    for (const line in this._lineList) {
      const button = this._privateDomUtils.createButton(`${line}Button`, line);
      this._privateDomUtils.appendToIdName(this.SELECT_LINE_SECTION, button);
      button.style.margin = "2px";
      this.addEventToSelectButton(button, line);
    }
  }

  addEventToSelectButton(button, line) {
    button.addEventListener('click', () => {
      this.showManageLineSection();
      this.changeManageLineSection(line);
    })
  }

  showManageLineSection() {
    this._manageLineSection.style.display = 'block';
  }

  changeManageLineSection(line) {
    this.changeManageLineSectionTitle(line);
    this.changeManageLineSectionTable(line);
  }

  changeManageLineSectionTitle(line) {
    const manageLineTitle = document.querySelector("#manageLineSection h3");

    manageLineTitle.innerHTML = line + this.MANAGE_LINE_TITLE;
  }

  changeManageLineSectionTable(line) {
    this._privateTableUtils.refreshTableData(this.LINE_TABLE_SECTION, line);
  }

  createManageLineSection() {
    this._privateCommonUtils.createDiv(this.ARTICLE_NAME, this.MANAGE_LINE_SECTION);
    this._privateCommonUtils.createTitle(this.MANAGE_LINE_TITLE_TAG, this.MANAGE_LINE_TITLE, this.MANAGE_LINE_SECTION);
    this.createSectionAddArea();

    this._manageLineSection = document.getElementById(this.MANAGE_LINE_SECTION);
    this._manageLineSection.style.display = 'none';
  }

  createSectionAddArea() {
    this._privateCommonUtils.createTitle(this.ADD_SECTION_TITLE_TAG, this.ADD_SECTION_TITLE, this.MANAGE_LINE_SECTION);
    this._privateSelectUtils.createSelect(this.MANAGE_LINE_SECTION, this.SECTION_STATION_SELECTOR, this._privateCommonUtils, this._privateDomUtils);
    this._orderInput = this.createSectionOrderInput();
    this.createSectionAddButton();
  }

  createSectionOrderInput() {
    const inputObject = this.createInputObject();
    const input = this._privateDomUtils.createInput(inputObject);

    return input;
  }

  createInputObject() {
    const inputObject = {
      'attribute': 'id',
      'toIdName': this.MANAGE_LINE_SECTION,
      'idName': this.SECTION_ORDER_INPUT,
      'placeholder': this.SECTION_ORDER_INPUT_PLACEHOLDER,
      'type': 'number',
    }

    return inputObject;
  }

  createSectionAddButton() {
    const button = this._privateDomUtils.createButton(this.ADD_BUTTON, this.ADD_BUTTON_TEXT);

    this._privateDomUtils.appendToIdName(this.MANAGE_LINE_SECTION, button);
    this.addEventToAddButton(button);
  }

  addEventToAddButton(button) {
    button.addEventListener('click', () => {
      this.addSection();
    })
    this._orderInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.addSection();
      }
    })
  }

  addSection() {

  }

  createManageLineSectionTable() {
    this._privateCommonUtils.createDiv(this.MANAGE_LINE_SECTION, this.LINE_TABLE_SECTION);
    this._privateCommonUtils.insertEmptyline(this.LINE_TABLE_SECTION);
    this._privateCommonUtils.insertEmptyline(this.LINE_TABLE_SECTION);
    this._privateTableUtils.initTable(this.LINE_TABLE_SECTION);
  }
}
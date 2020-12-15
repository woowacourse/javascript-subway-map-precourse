import TableUtils from './table_utils.js';
import DomUtils from './dom_utils.js';
import CommonUtils from './common_utils.js';
import SelectUtils from './select_utils.js';
import StringUtils from './string_utils.js';

export default class ManageSection {
  setPrivateVariables() {
    this._privateTableUtils = new TableUtils();
    this._privateDomUtils = new DomUtils();
    this._privateCommonUtils = new CommonUtils();
    this._privateSelectUtils = new SelectUtils();
    this._privateStringUtils = new StringUtils();
  }

  setConst() {
    this.IS_VALID = 1;
    this.IS_NOT_VALID = 0;

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

    this.LINE_BUTTONS_CLASS = 'line-button';
    this.SELECT_LINE_BUTTON_CLASS = 'section-line-menu-button';
    this.DELETE_BUTTON_CLASS = 'section-delete-button';

    this.SECTION_STATION_SELECTOR = 'section-station-selector';
    this.SECTION_ORDER_INPUT = 'section-order-input';
    this.ADD_BUTTON = 'section-add-button';
    this.ADD_BUTTON_TEXT = '등록';

    this.IS_EMPTY_ERROR_MESSAGE = '순서를 입력해주세요.';
    this.IS_NEGATIVE_ERROR_MESSAGE = '음수가 아닌 정수 순서를 입력해주세요.';
    this.IS_NOT_CONSECUTIVE_ERROR_MESSAGE = '기존 순서들과 연속되는 순서를 입력해주세요.';
    this.IS_ALREADY_REGISTERED_ERROR_MESSAGE = '이미 등록되어있는 역입니다.';
  }

  getLocalStorage() {
    this._lineList = this._privateCommonUtils.getLocalStorageLine();
    this._stationList = this._privateCommonUtils.getLocalStorageStation();
  }

  initPage() {
    this.setPrivateVariables();
    this.setConst();
    this.getLocalStorage();

    this.createSelectLineSection();
    this.createManageLineSection();
    this.createManageLineSectionTable();
  }

  /*
   * createSelectLineSection()
   */

  createSelectLineSection() {
    this._privateCommonUtils.createDiv(this.ARTICLE_NAME, this.SELECT_LINE_SECTION);
    this._privateCommonUtils.createTitle(this.SELECT_LINE_TITLE_TAG, this.SELECT_LINE_TITLE, this.SELECT_LINE_SECTION);
    this.createLineButtons();
  }
  
  createLineButtons() {
    this.setPrivateVariables();
    this.setConst();
    const lineList = this._privateCommonUtils.getLocalStorageLine();

    for (const line in lineList) {
      const button = this._privateDomUtils.createButton(`${line}Button`, line);

      this._privateDomUtils.appendToIdName(this.SELECT_LINE_SECTION, button);
      button.style.margin = "2px";
      this._privateDomUtils.setAttribute('class', button, this.LINE_BUTTONS_CLASS);
      this.addEventToLineSelectButton(button, line);
    }
  }

  addEventToLineSelectButton(button, line) {
    button.addEventListener('click', () => {
      this.showManageLineSection();
      this.changeManageLineSection(line);
    })
  }

  showManageLineSection() {
    const manageLineSection = document.getElementById(this.MANAGE_LINE_SECTION);

    manageLineSection.style.display = 'block';
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

  /*
   * createManageLineSection()
   */

  createManageLineSection() {
    this._privateCommonUtils.createDiv(this.ARTICLE_NAME, this.MANAGE_LINE_SECTION);
    this._privateCommonUtils.createTitle(this.MANAGE_LINE_TITLE_TAG, this.MANAGE_LINE_TITLE, this.MANAGE_LINE_SECTION);
    this.createSectionAddArea();
    this.hideManageLineSection();
  }

  hideManageLineSection() {
    const manageLineSection = document.getElementById(this.MANAGE_LINE_SECTION);
    
    manageLineSection.style.display = 'none';
  }

  createSectionAddArea() {
    this._privateCommonUtils.createTitle(this.ADD_SECTION_TITLE_TAG, this.ADD_SECTION_TITLE, this.MANAGE_LINE_SECTION);
    this._privateSelectUtils.createSelect(this.MANAGE_LINE_SECTION, this.SECTION_STATION_SELECTOR, this._privateCommonUtils, this._privateDomUtils);
    this.createSectionOrderInput();
    this.createSectionAddButton();
  }

  createSectionOrderInput() {
    const inputObject = this.createInputObject();
    this._orderInput = this._privateDomUtils.createInput(inputObject);
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
      this.createNewSection();
    })
    this._orderInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.createNewSection();
      }
    })
  }

  createNewSection() {
    if (this.checkSectionValidity() === this.IS_VALID) {
      const line = this.getCurrentLineFromTitle();

      this.updateAddToLocalStorage();
      this._privateTableUtils.refreshTableData(this.LINE_TABLE_SECTION, line);
      this.renewSectionUserInteractions();
    }
    else {
      this.alertCorrespondingError();
    }
  }

  renewSectionUserInteractions() {
    this._privateCommonUtils.renewSelect('section-station-selector');
    this._privateCommonUtils.emptyInput(this._orderInput);
  }

  checkSectionValidity() {
    if (this.isAlreadyRegistered() === this.IS_NOT_VALID) {
        return this.IS_NOT_VALID
    }
    if (this.isEmpty() === this.IS_NOT_VALID) {
      return this.IS_NOT_VALID;
    }
    if (this.isNegative() === this.IS_NOT_VALID) {
      return this.IS_NOT_VALID;
    }
    if (this.isNotConsecutive() === this.IS_NOT_VALID) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isAlreadyRegistered() {
    const lineList = this._privateCommonUtils.getLocalStorageLine();
    const line = this.getCurrentLineFromTitle();
    const station = this.getSelectedStation();

    if (lineList[line].includes(station)) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isEmpty() {
    if (!this._orderInput.value) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isNegative() {
    if (this._orderInput.value < 0) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isNotConsecutive() {
    const tbody = document.querySelector(`#${this.LINE_TABLE_SECTION}Table tbody`);
    const rowCount = tbody.childElementCount;

    if (this._orderInput.value >= rowCount) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  alertCorrespondingError() {
    if (this.isEmpty() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.IS_EMPTY_ERROR_MESSAGE);
    }
    else if (this.isNegative() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.IS_NEGATIVE_ERROR_MESSAGE);
    }
    else if (this.isNotConsecutive() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.IS_NOT_CONSECUTIVE_ERROR_MESSAGE);
    }
    else if (this.isAlreadyRegistered() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.IS_ALREADY_REGISTERED_ERROR_MESSAGE);
    }
  }

  updateAddToLocalStorage() {
    const lineList = this._privateCommonUtils.getLocalStorageLine();
    const stationList = this._privateCommonUtils.getLocalStorageStation();
    const line = this.getCurrentLineFromTitle();
    const station = this.getSelectedStation();

    lineList[line].splice(this._orderInput.value, 0, station);
    stationList[station].push(line);

    this._privateCommonUtils.saveToLocalStorage('lineList', lineList);
    this._privateCommonUtils.saveToLocalStorage('stationList', stationList);
  }

  getCurrentLineFromTitle() {
    const title = document.querySelector("#manageLineSection h3");

    return title.innerHTML.split(' ')[0];
  }

  getSelectedStation() {
    return document.getElementById('section-station-selector').value;
  }

  /*
   * createManageLineSectionTable
   */

  createManageLineSectionTable() {
    this._privateCommonUtils.createDiv(this.MANAGE_LINE_SECTION, this.LINE_TABLE_SECTION);
    this._privateCommonUtils.insertEmptyline(this.LINE_TABLE_SECTION);
    this._privateCommonUtils.insertEmptyline(this.LINE_TABLE_SECTION);
    this._privateTableUtils.initTable(this.LINE_TABLE_SECTION);
  }
}
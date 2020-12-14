import CommonUtils from "./common_utils.js";
import DomUtils from "./dom_utils.js";
import TableUtils from "./table_utils.js";
import Line from './line.js';

export default class ManageLine {
  constructor() {
    this.setConst();
    this._privateCommonUtils = new CommonUtils();
    this._privateDomUtils = new DomUtils();
    this._privateTableUtils = new TableUtils();
    this.initPage();
  }
  setConst() {
    this.ARTICLE_NAME = 'lineArticle';

    this.LINE_INPUT_ID = 'line-name-input';
    this.LINE_INPUT_TITLE_TAG = 'div';
    this.LINE_INPUT_TITLE_TEXT = '노선 이름';
    this.LINE_INPUT_PLACEHOLDER = '노선 이름을 입력해주세요';
    this.LINE_INPUT_TYPE = 'String';

    this.START_SELECTOR_SECTION = 'startSelectorSection';
    this.END_SELECTOR_SECTION = 'endSelectorSection';
    this.LINE_START_SELECTOR_TEXT = '상행 종점 ';
    this.LINE_END_SELECTOR_TEXT = '하행 종점 '
    this.LINE_START_SELECTOR_ID = 'line-start-station-selector';
    this.LINE_END_SELECTOR_ID = 'line-end-station-selector';

    this.ADD_BUTTON_ID = 'line-add-button';
    this.ADD_BUTTON_TEXT = '노선 추가';

    this.LINE_LIST_TITLE_TAG = 'h1';
    this.LINE_LIST_TITLE_TEXT = '🚉 지하철 역 목록';
    
    this.IS_VALID = true;
    this.IS_NOT_VALID = false;
  }

  initPage() {
    this.createInputSection();
    this.createSelectorSection();
    this._privateCommonUtils.insertNewline(this.ARTICLE_NAME);
    this.createLineAddButton();
    this.createTableSection();
  }

  createInputSection() {
    this._privateCommonUtils.createTitle('div', this.LINE_INPUT_TITLE_TEXT, this.ARTICLE_NAME);
    this.createLineInput();
  }

  createLineInput() {
    const inputObject = this.lineInputObject();

    this._lineInput = this._privateDomUtils.createInput(inputObject);
  }

  lineInputObject() {
    const inputObject = {
      'toIdName': this.ARTICLE_NAME,
      'idName': this.LINE_INPUT_ID,
      'placeholder': this.LINE_INPUT_PLACEHOLDER,
      'type': this.LINE_INPUT_TYPE,
    }

    return inputObject;
  }

  createSelectorSection() {
    const selectorSection = document.createElement('div');
    
    this._privateDomUtils.appendToIdName(this.ARTICLE_NAME, selectorSection);
    this._privateDomUtils.setAttribute('id', selectorSection, this.SELECTOR_SECTION_NAME)


    this._privateCommonUtils.createTitle('span', this.LINE_START_SELECTOR_TEXT, this.SELECTOR_SECTION_NAME);
    this._startSelector = this.createSelector(selectorSection ,this.LINE_START_SELECTOR_ID);
    this._privateCommonUtils.createTitle('span', this.LINE_END_SELECTOR_TEXT, this.SELECTOR_SECTION_NAME);
    this._endSelector = this.createSelector(selectorSection, this.LINE_END_SELECTOR_ID);
  }

  createSelector(toVarName, idName) {
    const selector = document.createElement('SELECT');

    this._privateDomUtils.setAttribute('id', selector, idName);
    this._privateDomUtils.appendToVarName(toVarName, selector);
    this.addStationsToSelector(selector);

    return selector;
  }

  addStationsToSelector(selector) {
    this._stationList = this._privateCommonUtils.getLocalStorageStation();

    if (!this._stationList) {
      this._stationList = {};
    }

    for (const station in this._stationList) {
      this.createSelectorOption(selector, station);
    }
  }

  createSelectorOption(selector, station) {
    const option = document.createElement('option');

    option.innerHTML = station;
    selector.add(option);
  }

  createLineAddButton() {
    this._lineAddButton = this._privateDomUtils.createButton(this.ADD_BUTTON_ID, this.ADD_BUTTON_TEXT);
    this._privateDomUtils.appendToIdName(this.ARTICLE_NAME, this._lineAddButton);
    this.addEventToButton();
  }

  createTableSection() {
    this._privateCommonUtils.createTitle(this.LINE_LIST_TITLE_TAG, this.LINE_LIST_TITLE_TEXT, this.ARTICLE_NAME);
    // this._privateTableUtils.initTable(this.ARTICLE_NAME);
  }

  addEventToButton() {
    this._lineAddButton.addEventListener('click', () => {
      this.createNewLine();
    })
    this._lineInput.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.createNewLine();
      }
    })
  }

  createNewLine() {
    const newLine = new Line(this._lineInput.value);
    
    newLine.addLine(this._lineInput.value);

  }
}
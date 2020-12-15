import CommonUtils from "./common_utils.js";
import DomUtils from "./dom_utils.js";
import TableUtils from "./table_utils.js";
import SelectUtils from "./select_utils.js";
import StringUtils from "./string_utils.js";

export default class ManageLine {
  setPrivateVariables() {
    this._privateCommonUtils = new CommonUtils();
    this._privateDomUtils = new DomUtils();
    this._privateTableUtils = new TableUtils();
    this._privateSelectUtils = new SelectUtils();
    this._privateStringUtils = new StringUtils();
  }

  setConst() {
    this.ARTICLE_NAME = 'lineArticle';

    this.LINE_INPUT_ID = 'line-name-input';
    this.LINE_INPUT_TITLE_TAG = 'div';
    this.LINE_INPUT_TITLE_TEXT = '노선 이름';
    this.LINE_INPUT_PLACEHOLDER = '노선 이름을 입력해주세요';
    this.LINE_INPUT_TYPE = 'String';
    
    this.ADD_BUTTON_ID = 'line-add-button';
    this.ADD_BUTTON_TEXT = '노선 추가';

    this.LINE_LIST_TITLE_TAG = 'h2';
    this.LINE_LIST_TITLE_TEXT = '🚉 지하철 역 목록';
    
    this.IS_VALID = 1;
    this.IS_NOT_VALID = 0;

    this.DELETE_BUTTON_TEXT = '삭제';
    this.IS_NOT_VALID = false;
    this.IS_VALID = true;

    this.EMPTY_ERROR_MESSAGE = '노선 이름을 한 글자 이상 입력해주세요';
    this.OVERLAP_ERROR_MESSAGE = '이미 존재하는 노선 이름입니다.'
    this.SAME_START_END_ERROR_MESSAGE = '상행 종점역과 하행 종점역이 같습니다.'
  }

  initPage() {
    this.setConst();
    this.setPrivateVariables();
    this.initLists();

    this.createLineAddSection();
    this.createTableSection();
  }

  initLists() {
    this._lineList = this._privateCommonUtils.getLocalStorageLine();
    this._stationList = this._privateCommonUtils.getLocalStorageStation();
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
  }

  /*
   * this.createLineAddSection()
   */

   createLineAddSection() {
    this.createInputSection();
    this._privateSelectUtils.createSelectSection(this.ARTICLE_NAME);
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
    this.createLineAddButton();
   }

  createInputSection() {
    this._privateCommonUtils.createTitle('div', this.LINE_INPUT_TITLE_TEXT, this.ARTICLE_NAME);
    this.createLineInput();
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
  }

  createLineInput() {
    const inputObject = this.lineInputObject();

    this._lineInput = this._privateDomUtils.createInput(inputObject);
  }

  lineInputObject() {
    const inputObject = {
      'attribute': 'id',
      'toIdName': this.ARTICLE_NAME,
      'idName': this.LINE_INPUT_ID,
      'placeholder': this.LINE_INPUT_PLACEHOLDER,
      'type': this.LINE_INPUT_TYPE,
    }

    return inputObject;
  }

  /*
   * this.createLineAddButton()
   */

  createLineAddButton() {
    this._lineAddButton = this._privateDomUtils.createButton(this.ADD_BUTTON_ID, this.ADD_BUTTON_TEXT);
    this._privateDomUtils.appendToIdName(this.ARTICLE_NAME, this._lineAddButton);
    this.addEventToButton();
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
    this._lineInputValue = this._privateStringUtils.removeSpace(this._lineInput.value);
    
    if (this.checkLineValidity() === this.IS_VALID) {
      this.updateAddToLocalStorage();
      this.addLine();
      this.renewLineUserInteractions();
    }
  }

  checkLineValidity() {
    if (this.isEmpty() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.EMPTY_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    if (this.overlap() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.OVERLAP_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    if (this.sameStartEnd() === this.IS_NOT_VALID) {
      this._privateCommonUtils.alertError(this.SAME_START_END_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isEmpty() {
    if (this._lineInputValue.length === 0) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  overlap() {
    const lineList = this._privateCommonUtils.getLocalStorageLine();
    if  (this._lineInputValue in lineList) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  sameStartEnd() {
    this.getSelect();
    if (this._startSelect.value === this._endSelect.value) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  getSelect() {
    this._startSelect = document.getElementById('line-start-station-selector');
    this._endSelect = document.getElementById('line-end-station-selector');
  }

  updateAddToLocalStorage() {
    const lineList = this._privateCommonUtils.getLocalStorageLine();
    const stationList = this._privateCommonUtils.getLocalStorageStation();
    lineList[this._lineInputValue] = [this._startSelect.value, this._endSelect.value];
    stationList[this._startSelect.value].push(this._lineInputValue);
    stationList[this._endSelect.value].push(this._lineInputValue);

    this._privateCommonUtils.saveToLocalStorage('lineList', lineList);
    this._privateCommonUtils.saveToLocalStorage('stationList', stationList);
  }

  addLine() {
    const rowArray = [this._lineInputValue, this._startSelect.value, this._endSelect.value, this.DELETE_BUTTON_TEXT];

    this._privateTableUtils.addRow(rowArray, this.ARTICLE_NAME);
  }

  renewLineUserInteractions() {
    this._privateCommonUtils.emptyInput(this._lineInput);
    this._privateCommonUtils.renewSelect('line-start-station-selector');
    this._privateCommonUtils.renewSelect('line-end-station-selector');
  }

  /*
   * this.createTableSection()
   */

  createTableSection() {
    this._privateCommonUtils.createTitle(this.LINE_LIST_TITLE_TAG, this.LINE_LIST_TITLE_TEXT, this.ARTICLE_NAME);
    this._privateTableUtils.initTable(this.ARTICLE_NAME);
  }
}
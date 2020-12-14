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

    this.LINE_START_SELECT_TEXT = '상행 종점 ';
    this.LINE_END_SELECT_TEXT = '하행 종점 '
    this.LINE_START_SELECT_ID = 'line-start-station-select';
    this.LINE_END_SELECT_ID = 'line-end-station-select';

    this.ADD_BUTTON_ID = 'line-add-button';
    this.ADD_BUTTON_TEXT = '노선 추가';

    this.LINE_LIST_TITLE_TAG = 'h1';
    this.LINE_LIST_TITLE_TEXT = '🚉 지하철 역 목록';
    
    this.IS_VALID = true;
    this.IS_NOT_VALID = false;

    this.DELETE_BUTTON_TEXT = '삭제';
    this.IS_NOT_VALID = false;
    this.IS_VALID = true;

    this.EMPTY_ERROR_MESSAGE = '노선 이름을 한 글자 이상 입력해주세요';
    this.OVERLAP_ERROR_MESSAGE = '이미 존재하는 노선 이름입니다.'
    this.SAME_START_END_ERROR_MESSAGE = '상행 종점역과 하행 종점역이 같습니다.'
  }

  initPage() {
    this.initLists();
    this.createInputSection();
    this.createSelectSection();
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
    this.createLineAddButton();
    this.createTableSection();
  }

  initLists() {
    this._lineList = this._privateCommonUtils.getLocalStorageLine();
    this._stationList = this._privateCommonUtils.getLocalStorageStation();

    if (!this._lineList) {
      this._lineList = {};
    }

    if (!this._stationList) {
      this._stationList = {};
    }
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

  createSelectSection() {
    this._privateCommonUtils.insertEmptyline(this.ARTICLE_NAME);
    this.createSelectStation('start');
    this.createSelectStation('end');
  }

  createSelectStation(position) {
    const positionUpper = position.toUpperCase();

    this._privateCommonUtils.createTitle('span', this[`LINE_${positionUpper}_SELECT_TEXT`], this.ARTICLE_NAME);
    this[`_${position}Select`] = this.createSelect(this.ARTICLE_NAME, this[`LINE_${positionUpper}_SELECT_ID`]);
  }

  createSelect(toIdName, idName) {
    const select = document.createElement('SELECT');

    this._privateDomUtils.setAttribute('id', select, idName);
    this._privateDomUtils.appendToIdName(toIdName, select);
    this.addStationsToselect(select);

    return select;
  }

  addStationsToselect(select) {
    for (const station in this._stationList) {
      this.createselectOption(select, station);
    }
  }

  createselectOption(select, station) {
    const option = document.createElement('option');

    this._privateDomUtils.addDataAttribute(option, station)
    option.innerHTML = station;
    select.add(option);
  }

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
    if (this.checkLineValidity(this._lineInput.value) === this.IS_VALID) {
      const lineStationArray = [this._startSelect.value, this._endSelect.value];

      this.updateAddToLocalStorage();
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
    if (this._lineInput.value.length === 0) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  overlap() {
    if  (this._lineInput.value in this._lineList) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  sameStartEnd() {
    if (this._startSelect.value === this._endSelect.value) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  updateAddToLocalStorage() {
    this._lineList[this._lineInput.value] = [this._startSelect.value, this._endSelect.value];
    this._stationList[this._startSelect.value].push(this._lineInput.value);
    this._stationList[this._endSelect.value].push(this._lineInput.value);

    this._privateCommonUtils.saveToLocalStorage('lineList', this._lineList);
    this._privateCommonUtils.saveToLocalStorage('stationList', this._stationList);
  }

  createTableSection() {
    this._privateCommonUtils.createTitle(this.LINE_LIST_TITLE_TAG, this.LINE_LIST_TITLE_TEXT, this.ARTICLE_NAME);
    this._privateTableUtils.initTable(this.ARTICLE_NAME);
  }

  createRowArray(lineName) {
    return [lineName, this.DELETE_BUTTON_TEXT];
  }
}
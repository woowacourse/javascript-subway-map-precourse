import DomUtils from './dom_utils.js';

export default class ManageStation {
  constructor() {
    this.setConst();
    this._privateDomUtils = new DomUtils();
    this.createStation();
  }

  setConst() {
    this.ARTICLE_NAME = 'stationArticle';
    this.STATION_NAME = '역 이름';
    this.SETTING = '설정';
    this.STATION_LIST = '지하철 역 목록';

    this.INPUT_ID = 'station-name-input';
    this.ADD_BUTTON_ID = 'station-add-button';
    this.DELETE_BUTTON_CLASS = 'station-delete-button';

    this.INPUT_PLACEHOLDER = '역 이름을 입력해주세요';
    this.INPUT_TYPE = 'String';
    this.ADD_BUTTON_TEXT = '역 추가';
    this.DELETE_BUTTON_TEXT = '삭제';
    this.DELETE_ALERT_MESSAGE = '정말로 삭제하시겠습니까?';
  }

  createStation() {
    // this.createNameInput();
    
  }

  createNameInput() {
    const inputObject = this.setInputObject();

    this._stationInput = this._privateDomUtils.createInput(inputObject);
  }

  setInputObject() {
    let inputObject = {
      'toIdName': this.ARTICLE_NAME,
      'idName': this.INPUT_ID,
      'placeholder': this.INPUT_PLACEHOLDER,
      'type': this.INPUT_TYPE,
    }

    return inputObject;
  }

}
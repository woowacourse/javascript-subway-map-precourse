import CommonUtils from './common_utils.js';
import DomUtils from './dom_utils.js';

export default class SelectUtils {
  setPrivateVariables() {
    this._privateCommonUtils = new CommonUtils();
    this._privateDomUtils = new DomUtils();
  }

  initLists() {
    this._lineList = this._privateCommonUtils.getLocalStorageLine();
    this._stationList = this._privateCommonUtils.getLocalStorageStation();
  }

  setConst() {
    this.LINE_START_SELECT_ID = 'line-start-station-selector';
    this.LINE_END_SELECT_ID = 'line-end-station-selector';
    this.LINE_START_SELECT_TEXT = '상행 종점 ';
    this.LINE_END_SELECT_TEXT = '하행 종점 '
  }

  createSelectSection(articleName) {
    this.setPrivateVariables();
    this.setConst();

    this._privateCommonUtils.insertEmptyline(articleName);
    this.createSelectStation('start', articleName);
    this._privateCommonUtils.insertEmptyline(articleName);
    this.createSelectStation('end', articleName);
    this._privateCommonUtils.insertEmptyline(articleName);
  }

  createSelectStation(position, articleName) {
    const positionUpper = position.toUpperCase();

    this._privateCommonUtils.createTitle('span', this[`LINE_${positionUpper}_SELECT_TEXT`], articleName);
    this[`_${position}Select`] = this.createSelect(articleName, this[`LINE_${positionUpper}_SELECT_ID`], this._privateCommonUtils, this._privateDomUtils);
  }

  createSelect(toIdName, idName, commonUtils, domUtils) {
    const select = document.createElement('SELECT');

    domUtils.setAttribute('id', select, idName);
    domUtils.appendToIdName(toIdName, select);
    this.addStationsToSelect(select, commonUtils, domUtils);

    return select;
  }

  addStationsToSelect(select, commonUtils, domUtils) {
    const stationList = commonUtils.getLocalStorageStation();

    for (const station in stationList) {
      this.createSelectOption(select, station, domUtils);
    }
  }

  createSelectOption(select, station, domUtils) {
    const option = document.createElement('option');

    domUtils.addDataAttribute(option, station)
    option.innerHTML = station;
    select.add(option);
  }
}
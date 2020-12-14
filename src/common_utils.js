import DomUtils from './dom_utils.js';

export default class CommonUtils {
  constructor() {
    this._privateDomUtils = new DomUtils();
  }

  alertError(errorMessage) {
    alert(errorMessage);
  }

  createTitle(titleTag, titleContent, toIdName) {
    const title = document.createElement(titleTag);

    title.innerHTML = titleContent;
    this._privateDomUtils.appendToIdName(toIdName, title);
  }

  createUnorderedList(stationList, toIdName) {
    const list = document.createElement('ul');

    this._privateDomUtils.appendToIdName(toIdName, list);

    for (const station of stationList) {
      this.createListElement(list, station);
    }
  }

  createListElement(list, station) {
    const element = document.createElement('li')

    element.innerHTML = station;
    this._privateDomUtils.appendToVarName(list, element);
  }

  insertEmptyline(toIdName) {
    const newline = document.createElement('br');

    this._privateDomUtils.appendToIdName(toIdName, newline);
  }
  
  getLocalStorageStation() {
    const stationList = JSON.parse(localStorage.getItem('stationList'));

    if (!stationList) {
      return {};
    }

    return stationList;
  }

  getLocalStorageLine() {
    const lineList = JSON.parse(localStorage.getItem('lineList'));

    if (!lineList) {
      return {};
    }

    return lineList;
  }

  saveToLocalStorage(datasetName, data) {
    localStorage.setItem(datasetName, JSON.stringify(data));
  }
}
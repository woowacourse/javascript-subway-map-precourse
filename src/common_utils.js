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
    this.insertNewline(toIdName);
    this._privateDomUtils.appendToIdName(toIdName, title);
  }

  insertNewline(toIdName) {
    const newline = document.createElement('br');

    this._privateDomUtils.appendToIdName(toIdName, newline);
  }
  
  getLocalStorageStation() {
    return JSON.parse(localStorage.getItem('stationList'));
  }

  getLocalStorageLine() {
    return JSON.parse(localStorage.getItem('lineList'));
  }

  saveToLocalStorage(datasetName, data) {
    localStorage.setItem(datasetName, JSON.stringify(data));
  }
}
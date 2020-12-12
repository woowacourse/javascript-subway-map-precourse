import DomUtils from './dom_utils.js';

export default class CommonUtils {
  constructor() {
    this._privateDomUtils = new DomUtils();
  }

  createTitle(titleTag, titleContent, toIdName) {
    const title = document.createElement(titleTag);

    title.innerHTML = titleContent;
    this.insertNewline(toIdName);
    this._privateDomUtils.appendTo(toIdName, title);
  }

  insertNewline(toIdName) {
    const newline = document.createElement('br');

    this._privateDomUtils.appendTo(toIdName, newline);
  }


}
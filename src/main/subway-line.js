import {LINE, STORAGE} from '../constants.js';
import {getList, saveList} from './subway-local-storage.js';
import {
  renderLineList, renderLine,
} from '../views/subway-line-view.js';

export default class SubwayLine {
  constructor() {
    this.stationList = getList(STORAGE.STATION.KEY);
    this.lineList = getList(STORAGE.LINE.KEY);
  }

  addLine = () => {
    const lineName = document.getElementById(LINE.INPUT.ID).value;
    const startLine = document.getElementById(LINE.SELECT.START.ID);
    const endLine = document.getElementById(LINE.SELECT.END.ID);

    if (!this.isValidLine(lineName)) {
      return alert(LINE.ALERT.DUPLICATION);
    }

    this.lineList.push({
      name: lineName,
      start: startLine.options[startLine.selectedIndex].text,
      end: endLine.options[endLine.selectedIndex].text,
    });

    saveList(STORAGE.LINE.KEY, this.lineList);
    renderLine(this.lineList);
  }

  deleteLine = (target) => {
    if (!this.deleteConfirm()) return;

    const id = parseInt(target.dataset.lineId);

    this.lineList = this.lineList.filter((line, i) => i !== id);

    saveList(STORAGE.LINE.KEY, this.lineList);
    renderLineList(this.lineList);
  }

  deleteConfirm() {
    return confirm(LINE.ALERT.DELETE);
  }

  isValidLine(line) {
    return this.hasValidName(line);
  }

  hasValidName(line) {
    const lineNames = this.lineList.map(line => line.name);

    if (lineNames.includes(line)) return false;

    return true;
  }
}

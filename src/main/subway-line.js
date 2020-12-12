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
      return this.alert(lineName);
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

  isValidLine(lineName) {
    return this.hasValidName(lineName);
  }

  hasValidName(lineName) {
    const lineNames = this.lineList.map(line => line.name);

    if (lineNames.includes(lineName)) return false;

    if (lineName.length === 0) return false;

    if (this.stationList.length === 0) return false;

    return true;
  }

  alert(lineName) {
    console.log(lineName.length);
    if (lineName.length === 0) {
      return alert(LINE.ALERT.EMPTY);
    }

    const lineNames = this.lineList.map(line => line.name);

    if (lineNames.includes(lineName)) {
      alert(LINE.ALERT.DUPLICATION);
    }

    alert(LINE.ALERT.EMPTY_STATION);
  }
}

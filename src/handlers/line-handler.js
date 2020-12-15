import {LINE, STORAGE} from '../constants.js';
import LineListener from '../listeners/line-listener.js';
import SubwayLine from '../main/subway-line.js';
import {saveList} from '../main/subway-local-storage.js';
import {
  renderLineRegister, renderLineResult, renderAddLine, renderDeleteLine,
} from '../views/subway-line-view.js';

class LineHandler {
  handleInitLine() {
    const subwayLine = new SubwayLine();

    renderLineRegister(subwayLine.stationList);
    renderLineResult(subwayLine.lineList);

    new LineListener(subwayLine);
  }

  handleAddLine(subwayLine) {
    const lineName = document.getElementById(LINE.INPUT.ID).value.trim();
    const startSelectBox = document.getElementById(LINE.SELECT.START.ID);
    const endSelectBox = document.getElementById(LINE.SELECT.END.ID);
    const start = startSelectBox.options[startSelectBox.selectedIndex].text;
    const end = endSelectBox.options[endSelectBox.selectedIndex].text;

    subwayLine.addLine(lineName, start, end, (err, lineList) => {
      if (err) return alert(err);

      saveList(STORAGE.LINE.KEY, lineList);
      renderAddLine(lineList, lineName);
    });
  }

  handleDeleteLine(subwayLine, target) {
    const lineName = target.dataset.lineName;

    if (!confirm(LINE.ALERT.DELETE)) return;

    subwayLine.deleteLine(lineName, (lineList) => {
      saveList(STORAGE.LINE.KEY, lineList);
      renderDeleteLine(lineName);
    });
  }
}

const lineHandler = new LineHandler();

export const {
  handleInitLine,
  handleAddLine,
  handleDeleteLine,
} = lineHandler;

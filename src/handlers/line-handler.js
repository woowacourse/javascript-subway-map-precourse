import LineListener
  from '../listeners/line-listener.js';
import SubwayLine from '../main/subway-line.js';
import {renderSubWayLine} from '../views/subway-line-view.js';

class LineHandler {
  handleLine() {
    const subwayLine = new SubwayLine();

    renderSubWayLine(subwayLine.stationList, subwayLine.lineList);

    new LineListener(subwayLine);
  }
}

const lineHandler = new LineHandler();

export const {
  handleLine,
} = lineHandler;

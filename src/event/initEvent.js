import selectMenuButtonEvent from './common/selectMenuButtonEvent.js';
import addStationEvent from './station/addStationEvent.js';
import addLineEvent from './line/addLineEvent.js';

export default function initEvent() {
  selectMenuButtonEvent();
  addStationEvent();
  addLineEvent();
}

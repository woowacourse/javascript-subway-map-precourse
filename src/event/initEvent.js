import selectMenuButtonEvent from './common/selectMenuButtonEvent.js';
import addStationEvent from './station/addStationEvent.js';

export default function initEvent() {
  selectMenuButtonEvent();
  addStationEvent();
}

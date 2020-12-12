import selectMenuButtonEvent from './selectMenuButtonEvent.js';
import addStationEvent from './addStationEvent.js';
import removeStationEvent from './removeStationEvent.js';

export default function initEvent() {
  selectMenuButtonEvent();
  addStationEvent();
  removeStationEvent();
}

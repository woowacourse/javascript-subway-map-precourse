import selectMenuButtonEvent from './common/selectMenuButtonEvent.js';
import addStationEvent from './station/addStationEvent.js';
import addLineEvent from './line/addLineEvent.js';
import selectLineEvent from './section/selectLineButtonEvent.js';
import addSectionEvent from './section/addSectionEvent.js';
import removeSectionEvent from './section/removeSectionEvent.js';

export default function initEvent() {
  selectMenuButtonEvent();
  addStationEvent();
  addLineEvent();
  selectLineEvent();
  addSectionEvent();
  removeSectionEvent();
}

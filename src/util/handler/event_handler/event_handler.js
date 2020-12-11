import { nodeSelector } from '../../selector/node_selector.js';

export default class EventHandler {
  handleClickEvent(targetId, onEventFunc, binder) {
    const target = nodeSelector.selectId(targetId);

    target.addEventListener('click', onEventFunc.bind(binder));
  }
}

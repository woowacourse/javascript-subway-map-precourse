import { nodeSelector } from '../selector/node_selector.js';

export default class EventHandler {
  handleButtonEvent(targetName, onEventFunc, binder) {
    const target =
      nodeSelector.selectId(targetName) || nodeSelector.selectClass(targetName);

    target.addEventListener('click', onEventFunc.bind(binder));
  }
}

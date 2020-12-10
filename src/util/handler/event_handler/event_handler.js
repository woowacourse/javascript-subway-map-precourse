import NodeSelector from '../../selector/node_selector.js';

export default class EventHandler {
  constructor() {
    this.nodeSelector = new NodeSelector();
  }

  handleClickEvent(targetId, onEventFunc) {
    const target = this.nodeSelector.selectId(targetId);

    target.addEventListener('click', onEventFunc);
  }
}

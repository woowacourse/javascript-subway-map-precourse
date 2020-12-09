import NodeGenerator from '../generator/node_generator.js';
import { NODES, FUNCTIONS } from '../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(content) {
    this._content = content;
    this.renderFuctionButton();
  }

  getIndex() {
    return FUNCTIONS.indexOf(this._content);
  }

  renderFuctionButton() {
    const nodeGenerator = new NodeGenerator();
    const index = this.getIndex(this.content);
    const functionButton = nodeGenerator.getButton(
      'button',
      `${index}. ${this._content}`
    );

    NODES.app.appendChild(functionButton);
  }
}

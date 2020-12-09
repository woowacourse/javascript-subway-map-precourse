import NodeGenerator from '../generator/node_generator.js';
import { NODES, FUNCTIONS } from '../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(id, content) {
    this._id = id;
    this._content = content;
    this.renderFuctionButton();
  }

  getIndex() {
    return FUNCTIONS.indexOf(this._content);
  }

  renderFuctionButton() {
    const nodeGenerator = new NodeGenerator();
    const index = this.getIndex();
    const functionButton = nodeGenerator.getButton(
      'button',
      `${index}. ${this._content}`
    );

    functionButton.id = this._id;
    NODES.app.appendChild(functionButton);
  }
}

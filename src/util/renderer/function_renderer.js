import NodeGenerator from '../generator/node_generator.js';
import { NODES, FUNCTION_CONTENTS } from '../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(id, content) {
    this.id = id;
    this._content = content;
    this.renderFuctionButton();
  }

  getIndex() {
    return FUNCTION_CONTENTS.indexOf(this._content);
  }

  renderFuctionButton() {
    const nodeGenerator = new NodeGenerator();
    const index = this.getIndex();
    const functionButton = nodeGenerator.getButton(
      'button',
      `${index}. ${this._content}`
    );

    functionButton.id = this.id;
    NODES.app.appendChild(functionButton);
  }

  renderFunction() {
    console.log('hi');
  }
}

import NodeGenerator from '../../generator/node_generator.js';
import {
  NODES,
  FUNCTION_CONTENTS,
  BUTTON_SUFFIX,
} from '../../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(id, content) {
    this.id = id;
    this.buttonId = id + BUTTON_SUFFIX;
    this._content = content;
  }

  renderFuctionButton() {
    const nodeGenerator = new NodeGenerator();
    const index = this.getIndex();
    const functionButton = nodeGenerator.getButton(
      'button',
      `${index}. ${this._content}`
    );

    functionButton.id = this.buttonId;
    NODES.app.appendChild(functionButton);
  }

  getIndex() {
    return FUNCTION_CONTENTS.indexOf(this._content);
  }

  renderFunction() {}
}

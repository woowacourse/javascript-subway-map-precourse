import NodeGenerator from '../../generator/node_generator.js';
import NodeSelector from '../../selector/node_selector.js';
import {
  FUNCTION_CONTENTS,
  BUTTON_SUFFIX,
  FUNCTION_BUTTON_SECTION_CLASS,
} from '../../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(id, content) {
    this.nodeGenerator = new NodeGenerator();
    this.nodeSelector = new NodeSelector();

    this.id = id;
    this.buttonId = id + BUTTON_SUFFIX;
    this._content = content;
  }

  renderFuctionButton() {
    const index = this.getIndex();
    const functionButton = this.nodeGenerator.getButton(
      'button',
      `${index}. ${this._content}`
    );

    functionButton.id = this.buttonId;
    this.nodeSelector
      .selectClass(FUNCTION_BUTTON_SECTION_CLASS)
      .appendChild(functionButton);
  }

  getIndex() {
    return FUNCTION_CONTENTS.indexOf(this._content);
  }

  renderFunction() {}
}

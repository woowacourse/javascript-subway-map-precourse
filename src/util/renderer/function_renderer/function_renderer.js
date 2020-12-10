import { nodeGenerator, nodeSelector } from '../../object/object.js';
import {
  ATTRIBUTES,
  NODES,
  FUNCTION_NAMES,
} from '../../../library/constant/constant.js';

export default class FuctionRenderer {
  constructor(id, content) {
    this.id = id;
    this._content = content;
  }

  renderFuctionButton() {
    const index = this.getIndex();
    const content = `${index}. ${this._content}`;
    const functionButton = nodeGenerator.getButton(ATTRIBUTES.BUTTON, content);

    functionButton.id = this.id + ATTRIBUTES.BUTTON;
    functionButton.className = NODES.FUNCTION_BUTTON;
    nodeSelector
      .selectClass(NODES.FUNCTION_BUTTON_SECTION)
      .appendChild(functionButton);
  }

  getIndex() {
    return FUNCTION_NAMES.indexOf(this._content);
  }

  renderFunction() {
    const functionWrapper = nodeGenerator.getDiv();
    const functionSection = nodeSelector.selectClass(NODES.FUNCTION_SECTION);

    functionWrapper.id = this.id;
    functionWrapper.className = NODES.FUNCTION;
    functionSection.appendChild(functionWrapper);
  }

  resetFunctionView() {}
}

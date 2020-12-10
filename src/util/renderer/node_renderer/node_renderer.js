import { nodeGenerator } from '../../object/object.js';

export default class NodeRenderer {
  renderButton(type, contents) {
    const button = nodeGenerator.getButton();

    button.type = type;
    button.innerText = contents;

    return button;
  }
}

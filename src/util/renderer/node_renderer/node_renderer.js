export default class NodeRenderer {
  renderButton(type, contents) {
    const button = document.createElement('button');

    button.type = type;
    button.innerText = contents;

    return button;
  }
}

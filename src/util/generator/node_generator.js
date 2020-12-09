export default class NodeGenerator {
  getButton(type, content) {
    const button = document.createElement('button');

    button.type = type;
    button.innerText = content;

    return button;
  }
}

export default class NodeGenerator {
  getButton(type, content) {
    const button = document.createElement('button');

    button.type = type;
    button.innerHTML = content;

    return button;
  }

  getSection() {
    const section = document.createElement('section');

    return section;
  }
}

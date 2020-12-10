export default class NodeSelector {
  selectId(id) {
    const selected = document.querySelector(`#${id}`);

    return selected;
  }

  selectClass(className) {
    const selected = document.querySelector(`.${className}`);

    return selected;
  }
}

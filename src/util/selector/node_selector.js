class NodeSelector {
  selectId(id) {
    const selected = document.querySelector(`#${id}`);

    return selected;
  }

  selectClass(className) {
    const selected = document.querySelector(`.${className}`);

    return selected;
  }

  selectClassAll(className) {
    const selected = document.querySelectorAll(`.${className}`);

    return selected;
  }

  selectTag(tag) {
    const selected = document.querySelector(tag);

    return selected;
  }
}

export const nodeSelector = new NodeSelector();

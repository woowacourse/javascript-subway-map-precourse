import CommonUtils from '../common/utils.js';

export default class PageLayout {
  constructor(controller) {
    this.controller = controller;
    this.elements = this.createElements();
  }

  handleManagerButton() {
    this.controller.setCurrentView(this);
    this.refreshResultData();
  }

  handleAddButton(view) {}

  displaySavedData() {}

  createElements() {}

  buildLayout() {}

  refreshResultData() {}

  // object형태로 받은 객체를 element로 내보내기
  createElement({
    tag,
    id = '',
    innerHTML = '',
    classList = [],
    // children = [],
    eventListener = {}, // {click: [], hover: []}
    ...rest
  } = {}) {
    const node = document.createElement(tag);
    CommonUtils.isEmpty(id) ? '' : (node.id = id);
    CommonUtils.isEmpty(innerHTML) ? '' : (node.innerHTML = innerHTML);
    CommonUtils.isEmpty(classList) ? '' : node.classList.add(...classList);
    if (!CommonUtils.isEmpty(eventListener)) {
      this.$addEventListener(node, eventListener);
    }
    if (!CommonUtils.isEmpty(rest)) {
      this.$setAttribute(node, rest);
    }
    // TODO: childeren
    return node;
  }

  $setAttribute(node, attribute) {
    for (const key in attribute) {
      node.setAttribute(`${key}`, attribute[key]);
    }
  }

  $addEventListener(node, eventObject) {
    for (const key in eventObject) {
      eventObject[key].map(handler => {
        node.addEventListener(`${key}`, handler);
      });
    }
  }

  $appendChildElement(parent, name, child) {
    parent.$children[name] = child;
  }

  createRowTemplate() {}

  $createCommonElements() {
    const elements = {
      managerButton: { $el: this.createManagerButton(), $children: {} },
      section: { $el: this.createSection(), $children: {} },
    };
    return elements;
  }

  createSection() {
    return this.createElement({ tag: 'section' });
  }

  $createElementNode(element, children = {}) {
    return {
      $el: element,
      $children: children,
    };
  }

  $render(root) {
    const element = root.$el;
    if (!CommonUtils.isEmpty(root.$children)) {
      for (const child in root.$children) {
        element.append(this.$render(root.$children[child]));
      }
    }

    return element;
  }

  createOption(stationName) {
    const clone = this.optionTemplate.content.cloneNode(true);
    const option = clone.querySelector('option');
    option.textContent = stationName;

    return clone;
  }

  createOptionTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'select-option',
      innerHTML: '<option></option>',
    });
  }

  getSelectedOption(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
  }
}

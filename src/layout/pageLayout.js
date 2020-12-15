import CommonUtils from '../common/utils.js';

export default class PageLayout {
  constructor(controller) {
    // this.elements = {
    //   managerButton: '',
    //   section: '',
    //   inputContainer: '',
    //   resultContainer: '',
    // };
    this.controller = controller;
    this.template = this.createTemplate();
    this.elements = this.createElements();
    this.buildLayout();
    this.displaySavedData();
  }

  handleManagerButton() {
    this.controller.setCurrentView(this);
    this.refreshResultData();
    console.log(`${this.constructor.name} showed!`);
  }

  handleAddButton(view) {
    console.log(`${this.constructor.name} add button clicked`);
  }

  displaySavedData() {
    console.log(`${this.constructor.name} displayed saved data`);
  }

  createElements() {
    console.log(`${this.constructor.name} created`);
  }

  buildLayout() {
    console.log(`${this.constructor.name} build!`);
  }

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

  createRowTemplate() {
    // TODO: resultTemplate
  }

  createTemplate() {
    // TODO: template 구성
    const template = document.createElement('template');
    template.innerHTML = `
      <button></button>
      <section></section>
    `;
    console.log('template created!');
  }

  // TODO: 가상 DOM (elements) 관련 => Static으로 뺄수있음 => 모듈 따로 만들기
  $createCommonElements() {
    const elements = {
      managerButton: { $el: this.createManagerButton(), $children: {} },
      section: { $el: this.createSection(), $children: {} },
    };
    return elements;
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
}

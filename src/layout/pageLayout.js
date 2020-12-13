export default class PageLayout {
  constructor(controller) {
    this.elements = {
      managerButton: '',
      section: '',
      inputContainer: '',
      resultContainer: '',
    };
    this.controller = controller;
    this.elements = this.createElements();
    this.buildLayout();
  }

  handleManagerButton() {
    this.controller.setCurrentView(this);
    console.log(`${this.constructor.name} showed!`);
  }

  // TODO: template 을 이용하여 생성하도록 수정하기
  createElements() {
    console.log(`${this.constructor.name} created`);
  }

  buildLayout() {
    console.log(`${this.constructor.name} build!`);
  }
}

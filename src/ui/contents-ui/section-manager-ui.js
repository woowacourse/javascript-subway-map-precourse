export default class SectionManagerUI {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
section Template 입니다.
`;

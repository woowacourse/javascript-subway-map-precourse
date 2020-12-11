export default class LineManagerUI {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
line Template 입니다.
`;

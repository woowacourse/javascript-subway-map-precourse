export default class StationManagerUI {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
station Template 입니다.
`;

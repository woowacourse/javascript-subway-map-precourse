export default class MapPrintManager {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
mapPrintManager Template 입니다.
`;

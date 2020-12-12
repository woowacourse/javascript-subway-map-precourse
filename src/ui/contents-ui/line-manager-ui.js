export default class LineManagerUI {
  constructor({ contentsContainer, stationINFOManager }) {
    this.contentsContainer_ = contentsContainer;
    this.stationINFOManager_ = stationINFOManager;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
line Template 입니다.
`;

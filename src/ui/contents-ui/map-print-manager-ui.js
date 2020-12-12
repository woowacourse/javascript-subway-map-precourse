export default class MapPrintManager {
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
mapPrintManager Template 입니다.
`;

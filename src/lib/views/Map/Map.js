import Typography from "../components/Typography.js";

export default class Map {
  _getTitle() {
    const $printMapTitle = new Typography("지하철 노선도 출력", "h1");
    return $printMapTitle.element.outerHTML;
  }

  render() {
    return `
      ${this._getTitle()}
    `;
  }
}

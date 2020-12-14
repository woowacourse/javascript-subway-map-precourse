import Component from "./Component.js";

/*
  MapPrintManager는 상태값을 관리하지 않는다.
*/
export default class MapPrintManager extends Component {
  constructor({ $parent, lineInfo }) {
    super({ $parent, lineInfo });
    this.$component.className = "map";

    this.render();
  }

  render() {
    const { lineInfo } = this.props;
    
    if (lineInfo.length === 0) {
      this.$component.innerHTML = "<h3>등록된 지하철 노선이 없습니다.</h3>";
    } else {
      this.renderMap();
    }
  }

  renderMap() {
    const { lineInfo } = this.props;

    this.$component.innerHTML = lineInfo.map(({ lineName, stations }) => {
      return `
        <h3>${lineName}</h3>
        <ul>
          ${stations.map(stationName => `<li>${stationName}</li>`).join("")}
        </ul>
    `;
    }).join("");
  }
}
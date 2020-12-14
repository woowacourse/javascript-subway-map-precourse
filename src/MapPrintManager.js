import Component from "./Component.js";
import { retrieveLineInfo } from "./util.js";

export default class MapPrintManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.$component.className = "map";

    this.initializeVariables();
    
    this.render();
  }

  initializeVariables() {
    this.lineInfo = retrieveLineInfo()
      .sort(({ lineName: aLineName }, { lineName: bLineName }) => {
        return aLineName < bLineName ? -1 : 1;
      });
  }

  render() {
    if (this.lineInfo.length === 0) {
      this.$component.innerHTML = "<div>등록된 지하철 노선이 없습니다.</div>";
    } else {
      this.$component.innerHTML = this.lineInfo.map(({ lineName, stations }) => {
        return `
        <div>${lineName}</div>
        <ul>
          ${stations.map(stationName => `<li>${stationName}</li>`).join("")}
        </ul>
      `;
      }).join("");
    }
  }
}
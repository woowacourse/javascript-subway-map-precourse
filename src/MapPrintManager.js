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
import { dispatchReRender } from "../utils/events.js";

const stations = ["인천", "소요산", "시청", "신도림", "대화", "오금"];

const elementMap = {
  lineNameInput: "line-name-input",
  lineStartStationSelector: "line-start-station-seletor",
  lineEndStationSelector: "line-end-station-seletor",
  lineAddButton: "line-add-button",
  lineDeleteButton: "line-delete-button",
};

export default class LineManager {
  constructor() {
    this.state = {
      lineName: "",
      lineStartStation: stations[0],
      lineEndStation: stations[0],
      lines: [],
    };

    this.handleLineAddButton = () => {
      const { lineEndStation, lineStartStation, lineName } = this.state;
      const newLine = {
        name: lineName,
        start: lineStartStation,
        end: lineEndStation,
      };
      this.setState({ ...this.state, lines: [...this.state.lines, newLine] });
    };
  }

  setState(state) {
    this.state = state;
    console.log(this.state);
    dispatchReRender();
  }

  mount() {
    const lineNameInput = document.getElementById(elementMap.lineNameInput);
    lineNameInput.addEventListener("blur", (event) => {
      this.setState({ ...this.state, lineName: event.target.value });
    });
    const lineStartStationSelector = document.getElementById(
      elementMap.lineStartStationSelector
    );
    lineStartStationSelector.addEventListener("change", (event) => {
      this.setState({ ...this.state, lineStartStation: event.target.value });
    });

    const lineEndStationSelector = document.getElementById(
      elementMap.lineEndStationSelector
    );
    lineEndStationSelector.addEventListener("change", (event) => {
      this.setState({ ...this.state, lineEndStation: event.target.value });
    });

    const lineAddButton = document.getElementById(elementMap.lineAddButton);
    lineAddButton.addEventListener("click", this.handleLineAddButton);
  }

  render() {
    const { lineName, lineStartStation, lineEndStation, lines } = this.state;
    return `
        <div>
          <h4 style="margin-bottom: 0;">노선 이름</h4>
          <input
            id=${elementMap.lineNameInput}
            placeholder="노선 이름을 입력해 주세요"
            style="margin-top: 0;"
            value="${lineName}"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 0;">
            상행 종점
            <select id=${elementMap.lineStartStationSelector}>
              ${stations.map(
                (station) =>
                  `<option value="${station}" ${
                    station === lineStartStation && "selected"
                  }>${station}</option>`
              )}
            </select>
          </h4>
          <h4 style="margin-top: 0;">
            하행 종점
            <select id=${elementMap.lineEndStationSelector}>
              ${stations.map(
                (station) =>
                  `<option value="${station}" ${
                    station === lineEndStation && "selected"
                  }>${station}</option>`
              )}
            </select>
          </h4>
        </div>
        <div>
          <button id=${elementMap.lineAddButton}>노선 추가</button>
        </div>
        <div>
          <h2>🚉 지하철 노선 목록</h2>
          <table>
            <thead>
              <tr>
                <td>노선 이름</td>
                <td>상행 종점역</td>
                <td>하행 종점역</td>
                <td>설정</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      `;
  }
}

import { dispatchReRender } from "../utils/events.js";
import Component from "../core/Component.js";

const elementMap = {
  lineNameInput: "line-name-input",
  lineStartStationSelector: "line-start-station-seletor",
  lineEndStationSelector: "line-end-station-seletor",
  lineAddButton: "line-add-button",
  lineDeleteButton: "line-delete-button",
};

export default class LineManager extends Component {
  constructor() {
    super();
    this.state = {
      lineName: "",
      lineStartStation: "",
      lineEndStation: "",
    };

    this.handleLineAddButton = () => {
      const line = {
        name: this.state.lineName,
        stations: [this.state.lineStartStation, this.state.lineEndStation],
      };
      const lines = this.store.lines ? [...this.store.lines, line] : [line];

      if (isDuplicateLine(this.store.lines, this.state.lineName)) {
        alert("중복된 노선이 존재합니다");
      } else {
        this.setStore({ ...this.store, lines });
      }
    };

    this.handleLineDeleteButton = (index) => {
      this.store.lines.splice(index, 1);
      this.setStore({ ...this.store });
    };
  }

  afterCreate() {
    const { lineStartStation, lineEndStation } = this.state;
    const { stations } = this.store;
    if (lineStartStation.length === 0)
      this.state.lineStartStation = stations[0];
    if (lineEndStation.length === 0) this.state.lineEndStation = stations[0];
  }

  mount() {
    this.mountNameInput();
    this.mountStartSelector();
    this.mountEndSelector();
    this.mountAddButton();
    this.mountDeleteButton();
  }

  mountNameInput() {
    const lineNameInput = document.getElementById(elementMap.lineNameInput);
    lineNameInput.addEventListener("blur", (event) => {
      this.setState({ ...this.state, lineName: event.target.value });
    });
  }

  mountStartSelector() {
    const lineStartStationSelector = document.getElementById(
      elementMap.lineStartStationSelector
    );
    lineStartStationSelector.addEventListener("change", (event) => {
      this.setState({ ...this.state, lineStartStation: event.target.value });
    });
  }

  mountEndSelector() {
    const lineEndStationSelector = document.getElementById(
      elementMap.lineEndStationSelector
    );
    lineEndStationSelector.addEventListener("change", (event) => {
      this.setState({ ...this.state, lineEndStation: event.target.value });
    });
  }

  mountAddButton() {
    const lineAddButton = document.getElementById(elementMap.lineAddButton);
    lineAddButton.addEventListener("click", this.handleLineAddButton);
  }

  mountDeleteButton() {
    const lineDeleteButtons = document.getElementsByClassName(
      elementMap.lineDeleteButton
    );
    [...lineDeleteButtons].forEach((lineDeleteButton, index) => {
      lineDeleteButton.addEventListener("click", () => {
        this.handleLineDeleteButton(index);
      });
    });
  }

  render() {
    const { lines = [], stations = [] } = this.store;
    const { lineName, lineStartStation, lineEndStation } = this.state;
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
              ${lines
                .map(
                  (line) =>
                    `<tr>
                       <td>${line.name}</td>
                       <td>${line.stations[0]}</td>
                       <td>${line.stations[1]}</td>
                       <td>
                        <button class=${elementMap.lineDeleteButton}>삭제</button>
                       </td>
                     </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
  }
}

function isDuplicateLine(lines = [], lineName) {
  return lines.find((line) => line.name === lineName);
}

// 노선 이름 공백 불가능 하도록

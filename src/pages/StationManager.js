import { dispatchReRender } from "../index.js";

const elementMap = {
  stationNameInput: "station-name-input",
  stationAddButton: "station-add-button",
  stationDeleteButton: "station-delete-button",
};

export default class StationManager {
  constructor() {
    this.state = {
      stations: [],
    };

    this.handleAddButtonClick = (newStation) => {
      this.state.stations.push(newStation);
      this.setState({ stations: [...this.state.stations] });
    };

    this.handleDeleteButtonClick = (index) => {
      this.state.stations.splice(index, 1);
      this.setState({ stations: [...this.state.stations] });
    };
  }

  setState(state) {
    this.state = state;
    dispatchReRender();
  }

  mount() {
    const stationNameInput = document.getElementById(
      elementMap.stationNameInput
    );
    const stationAddButton = document.getElementById(
      elementMap.stationAddButton
    );
    stationAddButton.addEventListener("click", () => {
      this.handleAddButtonClick(stationNameInput.value);
      console.log(this.state.stations);
    });
    const stationDeleteButtons = document.getElementsByClassName(
      elementMap.stationDeleteButton
    );
    [...stationDeleteButtons].forEach((stationDeleteButton, index) => {
      stationDeleteButton.addEventListener("click", () => {
        this.handleDeleteButtonClick(index);
        console.log(this.state.stations);
      });
    });
  }

  render() {
    const stations = this.state.stations;
    return `
    <div>
      <h4 style="margin-bottom: 0;">역 이름</h4>
        <div>
          <input id=${
            elementMap.stationNameInput
          } placeholder="역 이름을 입력해 주세요.">
          <button id=${elementMap.stationAddButton}>역 추가</button>
        </div>
        <div>
          <h2>🚉 지하철 역 목록</h2>
          <table>
            <thead>
              <tr>
                <td>역 이름</td>
                <td>설정</td>
              </tr>
            </thead>
            <tbody>
              ${stations
                .map(
                  (station) =>
                    `<tr>
                       <td>${station}</td>
                       <td>
                         <button class=${elementMap.stationDeleteButton}>삭제</button>
                       </td>
                     </tr>
                    `
                )
                .join("")}
            </tbody>    
          </table>
        </div>
    </div>
    `;
  }
}

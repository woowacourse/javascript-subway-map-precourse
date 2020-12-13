import { dispatchReRender } from "../utils/events.js";

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
      if (
        isMoreThanTwoWords(newStation) &&
        isNotDuplicateSatationName(newStation, this.state.stations) &&
        hasNotSpaceInStationName(newStation) &&
        isOnlyWord(newStation)
      ) {
        this.state.stations.push(newStation);
        this.setState({ stations: [...this.state.stations] });
      } else {
        alert("다시 입력해 주세요");
      }
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

function isMoreThanTwoWords(stationName) {
  if (stationName.length > 1) {
    return true;
  }
}

function isNotDuplicateSatationName(stationName, stations) {
  if (!stations.includes(stationName)) {
    return true;
  }
}

function hasNotSpaceInStationName(stationName) {
  if (![...stationName].includes(" ")) {
    return true;
  }
}

function isOnlyWord(stationName) {
  const check_num = /[0-9]/;
  const check_eng = /[a-zA-Z]/;
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  if (
    check_kor.test(stationName) &&
    !check_eng.test(stationName) &&
    !check_num.test(stationName) &&
    !check_spc.test(stationName)
  ) {
    return true;
  }
}

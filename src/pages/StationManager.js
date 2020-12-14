import Component from "../core/Component.js";

const elementMap = {
  stationNameInput: "station-name-input",
  stationAddButton: "station-add-button",
  stationDeleteButton: "station-delete-button",
};

export default class StationManager extends Component {
  constructor() {
    super();

    this.handleAddButtonClick = (newStation) => {
      if (
        isMoreThanTwoWords(newStation) &&
        isNotDuplicateSatationName(newStation, this.store.stations) &&
        hasNotSpaceInStationName(newStation) &&
        isOnlyWord(newStation)
      ) {
        const stations = this.store.stations
          ? [...this.store.stations, newStation]
          : [newStation];
        this.setStore({ ...this.store, stations });
      } else {
        alert("다시 입력해 주세요");
      }
    };

    this.handleDeleteButtonClick = (index) => {
      this.store.stations.splice(index, 1);
      this.setStore({ ...this.store });
    };
  }

  mount() {
    const stationNameInput = document.getElementById(
      elementMap.stationNameInput
    );
    this.mountAddButton(stationNameInput);
    this.mountDeleteButton();
  }

  mountAddButton(stationNameInput) {
    const stationAddButton = document.getElementById(
      elementMap.stationAddButton
    );
    stationAddButton.addEventListener("click", () => {
      this.handleAddButtonClick(stationNameInput.value);
    });
  }

  mountDeleteButton() {
    const stationDeleteButtons = document.getElementsByClassName(
      elementMap.stationDeleteButton
    );
    [...stationDeleteButtons].forEach((stationDeleteButton, index) => {
      stationDeleteButton.addEventListener("click", () => {
        this.handleDeleteButtonClick(index);
      });
    });
  }

  render() {
    const { stations = [] } = this.store;
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
  return stationName.length > 1;
}

function isNotDuplicateSatationName(stationName, stations = []) {
  return !stations.includes(stationName);
}

function hasNotSpaceInStationName(stationName) {
  return ![...stationName].includes(" ");
}

function isOnlyWord(stationName) {
  const check_num = /[0-9]/;
  const check_eng = /[a-zA-Z]/;
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return (
    check_kor.test(stationName) &&
    !check_eng.test(stationName) &&
    !check_num.test(stationName) &&
    !check_spc.test(stationName)
  );
}

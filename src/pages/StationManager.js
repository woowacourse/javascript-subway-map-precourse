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
    };
  }

  setState() {}

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
  }

  render() {
    return `
    <div>
      <h4 style="margin-bottom: 0;">역 이름</h4>
        <div>
          <input id=${elementMap.stationNameInput} placeholder="역 이름을 입력해 주세요.">
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
            </tbody>    
          </table>
        </div>
    </div>
    `;
  }
}

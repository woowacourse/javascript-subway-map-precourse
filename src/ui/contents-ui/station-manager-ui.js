import { getMessageToCheckStationName } from "../../utility/string-check-utility.js";

export default class StationManagerUI {
  constructor({ contentsContainer, stationINFOManager }) {
    this.contentsContainer_ = contentsContainer;
    this.stationINFOManager_ = stationINFOManager;
    this.setHTML();
    this.addEventToNameInputButton();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
  addEventToNameInputButton() {
    const button = this.contentsContainer_.querySelector(
      "#" + STATION_ADD_BUTTON_ID
    );
    const nameInput = this.contentsContainer_.querySelector(
      "#" + STATION_NAME_INPUT_ID
    );
    button.addEventListener("click", () => {
      const name = nameInput.value;
      const message = getMessageToCheckStationName(name);
      if (message !== "성공") {
        alert(message);
      }
    });
  }
}
const STATION_NAME_INPUT_ID = "station-name-input";
const STATION_ADD_BUTTON_ID = "station-add-button";
const STATION_DELETE_BUTTON_CLASS = "station-delete-button";
const TEMPLATE = `
역 이름<br>
<input type="text" placeholder="역 이름을 입력해주세요." id="${STATION_NAME_INPUT_ID}"/>
<button id="${STATION_ADD_BUTTON_ID}">역 추가</button>
<h2>🚉 지하철 역 목록</h2>
<table border="1">
  <th>역 이름</th>
  <th>설정</th>
  <tr>
    <td>첫번째 칸</td>
    <td>
      <button class="${STATION_DELETE_BUTTON_CLASS}">삭제</button>
    </td>
  </tr>
</table>
`;

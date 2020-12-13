import Component from "../../js/Component.js";
import { DOM_STATION } from "../../utils/constants.js";

export default class StationManagerRender extends Component {
  constructor() {
    super();
    console.log("--StationManagerRender--");
    this.initDOM();
    this.render();
    this.createDOM();
  }

  initDOM() {
    this.stationNameInputElement = document.createElement("div");
    this.stationNameForm = "";
    console.log(this.stationNameForm, "=-=-=-=-");
  }

  render() {
    this.stationNameInputElement.innerHTML = this.stationNameInputRender();

    this._app.append(this.stationNameInputElement);
  }

  createDOM() {
    this.stationNameForm = document.getElementById(DOM_STATION.STATION_FORM_ID);
  }

  stationNameInputRender() {
    return `  
      <label for=${DOM_STATION.STATION_NAME_INPUT_ID}>역 이름</label>
      <form id=${DOM_STATION.STATION_FORM_ID}>
        <input type="text" id=${DOM_STATION.STATION_NAME_INPUT_ID} placeholder="역 이름을 입력해 주세요" />
        <button id=${DOM_STATION.STATION_ADD_BUTTON_ID}>역 추가</button>
      </form>
    `;
  }
}

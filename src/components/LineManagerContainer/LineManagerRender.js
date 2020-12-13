import Component from "../../js/Component.js";
import { DOM_LINE } from "../../utils/constants.js";

export default class LineManagerRender extends Component {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManagerRender--");
    this.render();
  }

  render() {
    const lineInputElement = document.createElement("div");

    lineInputElement.innerHTML = this.lineInputRender();

    this._app.append(lineInputElement);
  }

  lineInputRender() {
    return `
    <label for=${DOM_LINE.LINE_NAME_INPUT_ID}>노선 이름</label>
    <form id="">
      <input type="text" id=${DOM_LINE.LINE_NAME_INPUT_ID} />
      <div>
        <label for=${DOM_LINE.LINE_START_STATION_SELECTOR_ID}>상행 종점</label>
        <select name="start-station" id=${
          DOM_LINE.LINE_START_STATION_SELECTOR_ID
        }>
          ${this.selectorOptionRender()}
        </select>
      </div>
      <div>
        <label for=${DOM_LINE.LINE_END_STATION_SELECTOR_ID}>하행 종점</label>
        <select name="end-station" id=${DOM_LINE.LINE_END_STATION_SELECTOR_ID}>
          ${this.selectorOptionRender()}
        </select>
      </div>
      <button id=${DOM_LINE.LINE_ADD_BUTTON_ID}>노선 추가</button>
    </form>
    `;
  }

  // startStationSelectorRender() {}

  // endStationSelectorRender() {}

  selectorOptionRender() {
    let selectorInnerHTML = ``;

    this.stations.forEach((station) => {
      selectorInnerHTML += `
      <option value=${station}>${station}</option>
      `;
    });

    return selectorInnerHTML;
  }
}

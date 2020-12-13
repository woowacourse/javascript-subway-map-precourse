import Component from "./Component.js";
import {
  LINE_INFO_LOCAL_STORAGE_KEY,
  STATION_INFO_LOCAL_STORAGE_KEY
} from "./constant.js";
import {
  createButtonHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement
} from "./util.js";

/* LineManager가 관리하는 상태값을 아래와 같다. 
다른 Manager가 관리하는 상태값은 localStorage에서 가져올 수 있다.
  state: {
    lineInfo: [
      {
        lineName: string // 노선 이름
        stations: [
          string
        ] // 해당 노선에 속한 역 이름들
          // 배열의 순서가 노선의 순서이다.
          // 상행종점(0) -> 하행종점(length-1)
      }
    ]
  }
*/
export default class LineManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.initializeState();
    this.initializeVariables();
    
    this.constructHTMLElements();
    this.appendChildNodes();
  }

  initializeState() {
    const storedState = JSON.parse(localStorage.getItem(LINE_INFO_LOCAL_STORAGE_KEY));
    
    this.state = storedState || { lineInfo: [] };
  }

  initializeVariables() {
    this.stationNameArray = this.extractStationNameArray();
  }

  extractStationNameArray() {
    const { stationInfo } = JSON.parse(localStorage.getItem(STATION_INFO_LOCAL_STORAGE_KEY));
    const stationNameArray = stationInfo.map(({ stationName }) => stationName);

    return stationNameArray;
  }

  constructHTMLElements() {
    this.$lineNameInput = this.createLineNameInput();

    this.$lineStartStationSelectorLabel = this.createLineStartStationSelectorLabel();
    this.$lineStartStationSelector = this.createLineStartStationSelector();

    this.$lineEndStationSelectorLabel = this.createLineEndStationSelectorLabel();
    this.$lineEndStationSelector = this.createLineEndStationSelector();

    this.$lineAddButton = this.createLineAddButton();
  }

  createLineNameInput() {
    return createInputTextHTMLElement({
      id: "line-name-input"
    });
  }

  createLineStartStationSelectorLabel() {
    return createLabelHTMLElement({
      name: "상행 종점",
      htmlFor: "line-start-station-selector"
    });
  }

  createLineStartStationSelector() {
    return createSelectHTMLElement({
      id: "line-start-station-selector",
      options: this.stationNameArray
    });
  }

  createLineEndStationSelectorLabel() {
    return createLabelHTMLElement({
      name: "하행 종점",
      htmlFor: "line-end-station-selector"
    });
  }

  createLineEndStationSelector() {
    return createSelectHTMLElement({
      id: "line-end-station-selector",
      options: this.stationNameArray
    });
  }

  createLineAddButton() {
    return createButtonHTMLElement({
      id: "line-add-button",
      name: "노선 추가"
    });
  }

  appendChildNodes() {
    this.$component.append(
      this.$lineNameInput,
      this.$lineStartStationSelectorLabel,
      this.$lineStartStationSelector,
      this.$lineEndStationSelectorLabel,
      this.$lineEndStationSelector,
      this.$lineAddButton
    );
  }

  setState(state) {
    super.setState(state);

    localStorage.setItem(LINE_INFO_LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  }

}
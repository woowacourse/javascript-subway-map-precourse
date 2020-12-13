import Component from "./Component.js";
import { STATION_INFO_LOCAL_STORAGE_KEY } from "./constant.js";
import {
  createButtonHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement
} from "./util.js";

export default class LineManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.initializeState();
    this.initializeVariables();
    
    this.constructHTMLElements();
    this.appendChildNodes();
  }

  initializeState() {
    this.state = {
      lineName: []
    };
  }

  initializeVariables() {
    this.stationNameArray = this.extractStationNameArray();
  }

  extractStationNameArray() {
    const { stationInfo } = JSON.parse(localStorage.getItem(STATION_INFO_LOCAL_STORAGE_KEY));
    const stationNameArray = stationInfo.map(({ stationName }) => stationName);

    return stationNameArray;
  }

  // eslint-disable-next-line max-lines-per-function
  constructHTMLElements() {
    this.$lineNameInput = createInputTextHTMLElement({
      id: "line-name-input"
    });

    this.$lineStartStationSelectorLabel = createLabelHTMLElement({
      name: "상행 종점",
      htmlFor: "line-start-station-selector"
    });
    
    this.$lineStartStationSelector = createSelectHTMLElement({
      id: "line-start-station-selector",
      options: this.stationNameArray
    });

    this.$lineEndStationSelectorLabel = createLabelHTMLElement({
      name: "하행 종점",
      htmlFor: "line-end-station-selector"
    });
    
    this.$lineEndStationSelector = createSelectHTMLElement({
      id: "line-end-station-selector",
      options: this.stationNameArray
    });

    this.$lineAddButton = createButtonHTMLElement({
      id: "line-add-button",
      name: "노선 추가"
    });

    this.childNodes = [
      this.$lineNameInput,
      this.$lineStartStationSelectorLabel,
      this.$lineStartStationSelector,
      this.$lineEndStationSelectorLabel,
      this.$lineEndStationSelector,
      this.$lineAddButton
    ];
  }

  appendChildNodes() {
    this.$component.append(...this.childNodes);
  }

}
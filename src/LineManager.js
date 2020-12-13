import Component from "./Component.js";
import {
  LINE_INFO_LOCAL_STORAGE_KEY,
  STATION_INFO_LOCAL_STORAGE_KEY
} from "./constant.js";
import {
  createButtonHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  createDivHTMLElement,
  clearInputValue
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
    this.declareConstants();
    this.initializeState();
    this.initializeVariables();
    
    this.constructHTMLElements();
    this.appendChildNodes();

    this.addClickEventListener();

    if (this.state.lineInfo.length > 0) {
      this.render();
    }
  }

  declareConstants() {
    this.LINE_DELETE_BUTTON_CLASSNAME = "line-delete-button";
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

    this.$lineNameList = createDivHTMLElement({});
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
      this.$lineAddButton,
      this.$lineNameList
    );
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id, classList } } = e;
      const { target: { dataset: { lineName } } } = e;

      if (id === this.$lineAddButton.id) {
        this.handleLineAdd();
      } else if (classList.contains(this.LINE_DELETE_BUTTON_CLASSNAME)) {
        console.log(lineName);
        // this.handleDeleteButton(lineName);
      }
    });
  }

  handleLineAdd() {
    const LineName = this.$lineNameInput.value;
    const lineStartStation = this.$lineStartStationSelector.value;
    const lineEndStation = this.$lineEndStationSelector.value;

    this.addNewLineName(LineName, lineStartStation, lineEndStation);    
    clearInputValue(this.$lineNameInput);
  }

  addNewLineName(newLineName, lineStartStation, lineEndStation) {
    this.setState({
      lineInfo: [
        ...this.state.lineInfo,
        {
          lineName: newLineName,
          stations: [lineStartStation, lineEndStation]
        }
      ]
    });
  }

  setState(state) {
    super.setState(state);

    localStorage.setItem(LINE_INFO_LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  }

  render() {
    this.$lineNameList.innerHTML = "<div>🚉 지하철 노선 목록</div>";
    const $childNodes = this.state.lineInfo.reduce((acc, {lineName,stations}) => {
      const lineNameRowElements = this.createLineNameRowElements({ lineName, stations });

      return [...acc, ...lineNameRowElements];
    }, []);

    this.$lineNameList.append(...$childNodes);
  }

  createLineNameRowElements({ lineName, stations }) {
    const $lineName = createDivHTMLElement({ innerText: lineName });
    const $lineStartStation = createDivHTMLElement({ innerText: stations[0] });
    const $lineEndStation = createDivHTMLElement({ innerText: stations[stations.length-1] });

    const $lineDeleteButton = createButtonHTMLElement({
      name: "삭제",
      classList: [this.LINE_DELETE_BUTTON_CLASSNAME],
      dataset: { lineName }
    });

    return [$lineName, $lineStartStation, $lineEndStation, $lineDeleteButton];
  }
}
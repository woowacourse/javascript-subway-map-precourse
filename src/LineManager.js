import Component from "./Component.js";
import {
  createButtonHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  createDivHTMLElement,
  clearInputValue,
  retrieveLineInfo,
  getStationNameArray,
  storeLineInfo,
  throwErrorWithMessage
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

    this.render();
  }

  declareConstants() {
    this.LINE_DELETE_BUTTON_CLASSNAME = "line-delete-button";
  }

  initializeState() {
    this.state = {
      lineInfo: retrieveLineInfo().sort(({ lineName: aLineName }, { lineName: bLineName }) => {
        return aLineName < bLineName ? -1 : 1;
      })
    };
  }

  initializeVariables() {
    this.stationNameArray = getStationNameArray().sort(); // 역 이름을 사전 순으로 정렬
  }

  constructHTMLElements() {
    this.$lineNameInput = this.createLineNameInput();
    this.$lineNameLabel = this.createLineNameLabel();

    this.$lineStartStationSelector = this.createLineStartStationSelector();
    this.$lineStartStationLabel = this.createLineStartStationLabel();

    this.$lineEndStationSelector = this.createLineEndStationSelector();
    this.$lineEndStationLabel = this.createLineEndStationLabel();

    this.$lineAddButton = this.createLineAddButton();

    this.$lineNameListTitle = createDivHTMLElement({ innerText: "🚉 지하철 노선 목록" });
    this.$lineNameList = createDivHTMLElement({});
  }

  createLineNameInput() {
    return createInputTextHTMLElement({
      id: "line-name-input",
      placeholder: "노선 이름을 입력해주세요.",
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleLineAdd();
        }
      }
    });
  }

  createLineNameLabel() {
    return createLabelHTMLElement({
      name: "노선 이름",
      htmlFor: this.$lineNameInput.id
    });
  }

  createLineStartStationSelector() {
    return createSelectHTMLElement({
      id: "line-start-station-selector",
      options: this.stationNameArray
    });
  }

  createLineStartStationLabel() {
    return createLabelHTMLElement({
      name: "상행 종점",
      htmlFor: this.$lineStartStationSelector.id
    });
  }

  createLineEndStationSelector() {
    return createSelectHTMLElement({
      id: "line-end-station-selector",
      options: this.stationNameArray
    });
  }

  createLineEndStationLabel() {
    return createLabelHTMLElement({
      name: "하행 종점",
      htmlFor: this.$lineEndStationSelector.id
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
      this.$lineNameLabel,
      this.$lineNameInput,
      this.$lineStartStationLabel,
      this.$lineStartStationSelector,
      this.$lineEndStationLabel,
      this.$lineEndStationSelector,
      this.$lineAddButton,
      this.$lineNameListTitle,
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
        this.handleDeleteButton(lineName);
      }
    });
  }

  handleLineAdd() {
    const lineName = this.$lineNameInput.value;
    const lineStartStation = this.$lineStartStationSelector.value;
    const lineEndStation = this.$lineEndStationSelector.value;

    if (this.isValidLineInfo(lineName, lineStartStation, lineEndStation)) {
      this.addNewLineName(lineName, lineStartStation, lineEndStation);
      clearInputValue(this.$lineNameInput);
    }
  }

  isValidLineInfo(lineNameUserInput, lineStartStation, lineEndStation) {
    try {
      this.validateLineNameLength(lineNameUserInput);
      this.validateUniqueLineName(lineNameUserInput);
      this.validateStartEndStationName(lineStartStation, lineEndStation);

      return true;
    } catch (error) {
      alert(error.message);

      return false;      
    }
  }

  validateLineNameLength(lineNameUserInput) {
    const MIN_LINE_NAME_LENGTH = 1;

    if (lineNameUserInput.length < MIN_LINE_NAME_LENGTH) {
      clearInputValue(this.$lineNameInput);

      throwErrorWithMessage(`지하철 노선은 1글자 이상이어야 합니다.`);
    }
  }

  validateUniqueLineName(lineNameUserInput) {
    const { lineInfo } = this.state;

    if (lineInfo.some(({ lineName }) => lineName === lineNameUserInput)) {
      this.$lineNameInput.focus();

      throwErrorWithMessage([
        `중복된 지하철 노선 이름은 등록될 수 없습니다.`,
        `입력된 지하철 노선 이름: ${lineNameUserInput}`
      ].join("\n"));
    }
  }

  validateStartEndStationName(lineStartStation, lineEndStation) {
    if (lineStartStation === lineEndStation) {
      this.$lineStartStationSelector.focus();

      throwErrorWithMessage([
        `상행 종점과 하행 종점은 서로 다른 역이어야 합니다.`,
        `상행 종점: ${lineStartStation}`,
        `하행 종점: ${lineEndStation}`
      ].join("\n"));
    }
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

  handleDeleteButton(targetLineName) {      
    if (confirm(`${targetLineName}을 삭제하시겠습니까?`)) {
      const targetExcluded = this.state.lineInfo.filter(({ lineName }) => lineName !== targetLineName);
      this.setLineInfoArray(targetExcluded);
    }
  }

  setLineInfoArray(lineInfo) {
    this.setState({ lineInfo });
  }

  setState(state) {
    super.setState(state);

    storeLineInfo(this.state.lineInfo);
  }

  render() {
    const { lineInfo } = this.state;

    this.$lineNameList.innerHTML = "";
    
    if (lineInfo.length === 0) {
      const $noLineMessage = createDivHTMLElement({ innerText: "등록된 지하철 노선이 없습니다." });

      this.$lineNameList.append($noLineMessage);
    } else {
      const $childNodes = this.createLineNameChildNodes();
      
      this.$lineNameList.append(...$childNodes);
    }
  }

  createLineNameChildNodes() {
    const { lineInfo } = this.state;

    return lineInfo.reduce(($acc, {lineName,stations}) => {
      const $lineNameRowElements = this.createLineNameRowElements({ lineName, stations });
      
      return [...$acc, ...$lineNameRowElements];
    }, []);
  }

  createLineNameRowElements({ lineName, stations }) {
    const $lineName = createDivHTMLElement({ innerText: lineName });
    const $lineStartStation = createDivHTMLElement({ innerText: stations[0] });
    const $lineEndStation = createDivHTMLElement({ innerText: stations[stations.length-1] });
    const $lineDeleteButton = this.createLineDeleteButton({ lineName });

    return [$lineName, $lineStartStation, $lineEndStation, $lineDeleteButton];
  }

  createLineDeleteButton({ lineName }) {
    return createButtonHTMLElement({
      name: "삭제",
      classList: [this.LINE_DELETE_BUTTON_CLASSNAME],
      dataset: { lineName }
    });
  }
}
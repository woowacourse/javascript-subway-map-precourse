import Component from "./Component.js";
import { classname } from "./constant.js";
import {
  createHTMLElement,
  createListHeaderHTMLElement,
  createButtonHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  createDivHTMLElement,
  clearInputValue,
  throwErrorWithMessage
} from "./util.js";

/* LineManager가 관리하는 상태값을 아래와 같다. 
  state: {
    lineInfo: [
      {
        lineName: string   // 노선 이름
        stations: [string] // 해당 노선에 속한 역 이름들. 
                           // 배열의 순서가 노선의 순서이다. 상행종점: 0 하행종점: length-1
      }
    ]
  }
*/
export default class LineManager extends Component {
  /* 
    props: { 
      $parent,              
      stationNameArray,      // 등록된 모든 지하철 역 이름들
      initialLineInfo,       // 지하철 노선 정보 상태값의 초기값
      setLineInfo,           // 지하철 노선 정보를 App.js의 상태값으로 등록하는 함수
      deleteSectionLineName  // 선택된 지하철 노선이 삭제되는 경우, 
                             // 선택된 지히철 노선 상태값을 삭제하는 함수
    }
  */
  constructor(props) {
    super(props);
    this.declareConstants();
    this.initializeState();
    
    this.constructHTMLElements();
    this.appendChildNodes();

    this.addClickEventListener();
    clearInputValue(this.$lineNameInput);


    this.render();
  }

  declareConstants() {
    this.LINE_NAME_INPUT_ID = "line-name-input";
    this.LINE_DELETE_BUTTON_CLASSNAME = "line-delete-button";
    this.LINE_START_STATION_SELECTOR_ID = "line-start-station-selector";
    this.LINE_END_STATION_SELECTOR = "line-end-station-selector";
  }

  initializeState() {
    const { initialLineInfo } = this.props;
    
    this.state = {
      lineInfo: initialLineInfo // 이미 지하철 노선 이름순으로 정렬되어 있다.
    };
  }

  constructHTMLElements() {
    this.$lineInfoSelectContainer = createDivHTMLElement({ classList: ["line-info-select-container"] });
    this.$lineNameInput = this.createLineNameInput();
    this.$lineNameLabel = this.createLineNameLabel();

    this.$lineStartStationLabel = this.createLineStartStationLabel();
    this.$lineStartStationSelector = this.createLineStartStationSelector();
    this.$lineEndStationLabel = this.createLineEndStationLabel();
    this.$lineEndStationSelector = this.createLineEndStationSelector();
    this.$lineAddButton = this.createLineAddButton();

    this.$lineNameListTitle = createHTMLElement({ tagname: "h3", innerText: "🚉 지하철 노선 목록" });
    this.$lineNameList = createDivHTMLElement({classList: ["line-name-list"]});
  }

  createLineNameLabel() {
    return createLabelHTMLElement({
      name: "노선 이름",
      htmlFor: this.LINE_NAME_INPUT_ID,
      classList: [
        "line-info-select-container__line-name-label",
        classname.H3LISH, classname.STRONG
      ],
    });
  }

  createLineNameInput() {
    return createInputTextHTMLElement({
      id: this.LINE_NAME_INPUT_ID,
      placeholder: "노선 이름을 입력해주세요.",
      classList: ["line-info-select-container__line-name-input"],
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleLineAdd();
        }
      }
    });
  }

  createLineStartStationLabel() {
    return createLabelHTMLElement({
      name: "상행 종점",
      htmlFor: this.LINE_START_STATION_SELECTOR_ID,
      classList: ["line-info-select-container__line-start-station-label"],
    });
  }

  createLineStartStationSelector() {
    const { stationNameArray } = this.props;

    return createSelectHTMLElement({
      id: this.LINE_START_STATION_SELECTOR_ID,
      classList: ["line-info-select-container__line-start-station-selector"],
      options: stationNameArray
    });
  }

  createLineEndStationLabel() {
    return createLabelHTMLElement({
      name: "하행 종점",
      htmlFor: this.LINE_END_STATION_SELECTOR,
      classList: ["line-info-select-container__line-end-station-label"],
    });
  }

  createLineEndStationSelector() {
    const { stationNameArray } = this.props;

    return createSelectHTMLElement({
      id: this.LINE_END_STATION_SELECTOR,
      options: stationNameArray,
      classList: ["line-info-select-container__line-end-station-selector"],
    });
  }

  createLineAddButton() {
    return createButtonHTMLElement({
      id: "line-add-button",
      name: "노선 추가",
      classList: [
        "line-info-select-container__line-add-button",
        classname.MEDIUM_BUTTON,
        classname.CENTER
      ],
    });
  }

  appendChildNodes() {
    this.$component.append(this.$lineInfoSelectContainer, this.$lineNameListTitle, this.$lineNameList
    );

    this.$lineInfoSelectContainer.append(
      this.$lineNameLabel,
      this.$lineNameInput,
      this.$lineStartStationLabel,
      this.$lineStartStationSelector,
      this.$lineEndStationLabel,
      this.$lineEndStationSelector,
      this.$lineAddButton
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
      this.setLineInfoArray([
        ...this.state.lineInfo,
        { lineName, stations: [lineStartStation, lineEndStation] }
      ]);
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

  handleDeleteButton(targetLineName) {      
    if (confirm(`${targetLineName}을 삭제하시겠습니까?`)) {
      const { lineInfo } = this.state;
      const { deleteSectionLineName } = this.props;

      const targetExcluded = lineInfo.filter(({ lineName }) => lineName !== targetLineName);
      this.setLineInfoArray(targetExcluded);

      deleteSectionLineName(targetLineName);
    }
  }

  setLineInfoArray(lineInfo) {
    this.setState({ lineInfo });
  }

  setState(state) {
    super.setState(state);

    const { lineInfo } = this.state;
    const { setLineInfo } = this.props;
    
    setLineInfo(lineInfo);
  }

  render() {
    const { lineInfo } = this.state;

    this.$lineNameList.innerHTML = "";
    
    if (lineInfo.length === 0) {
      this.renderNoLineMessage();
    } else {
      this.renderLineNameList();
    }
  }

  renderNoLineMessage() {
    const $noLineMessage = createDivHTMLElement({
      innerText: "등록된 지하철 노선이 없습니다.",
      classList: [classname.GRID_ONLY_CHILD]
    });

    this.$lineNameList.append($noLineMessage);
  }

  renderLineNameList() {
    const $childNodes = this.createLineNameChildNodes();
      
    this.$lineNameList.append(...$childNodes);
  }

  createLineNameChildNodes() {
    const { lineInfo } = this.state;

    return lineInfo.reduce(($acc, {lineName,stations}) => {
      const $lineNameRowElements = this.createLineNameRowElements({ lineName, stations });
      
      return [...$acc, ...$lineNameRowElements];
    }, this.createLineListHeaderArray());
  }

  createLineNameRowElements({ lineName, stations }) {
    const $lineName = createDivHTMLElement({ innerText: lineName, classList: [classname.CENTER] });
    const $lineStartStation = createDivHTMLElement({ innerText: stations[0], classList: [classname.CENTER] });
    const $lineEndStation = createDivHTMLElement({ innerText: stations[stations.length-1], classList: [classname.CENTER] });
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

  createLineListHeaderArray() {
    const LINE_NAME_LIST__HEADER_CLASSNAME = "line-name-list__header";

    const $nameHeader = createListHeaderHTMLElement({ innerText: "노선 이름", className: LINE_NAME_LIST__HEADER_CLASSNAME });
    const $lineStartStationHeader = createListHeaderHTMLElement({ innerText: "상행 종점역", className: LINE_NAME_LIST__HEADER_CLASSNAME});
    const $lineEndStationHeader = createListHeaderHTMLElement({ innerText: "하행 종점역", className: LINE_NAME_LIST__HEADER_CLASSNAME });
    const $buttonHeader = createListHeaderHTMLElement({ innerText: "설정", className: LINE_NAME_LIST__HEADER_CLASSNAME });

    return [$nameHeader, $lineStartStationHeader, $lineEndStationHeader, $buttonHeader];
  }
}
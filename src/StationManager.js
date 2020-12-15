import Component from "./Component.js";
import { classname } from "./constant.js";
import {
  createHTMLElement,
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createLabelHTMLElement,
  throwErrorWithMessage,
  createInputHTMLElement
} from "./util.js";

/* StationManager가 관리하는 상태값을 아래와 같다.
  state: {
    stationNameArray: [ string ]  // 등록된 모든 지하철 역 이름
  }
*/
export default class StationManager extends Component {
  /* 
    props: { 
      $parent, 
      initialStationNameArray,  // 지하철 역 이름들 상태값의 초기값
      lineInfo,                 // 등록된 모든 지하철 노선 정보
      setStationNameArray       // 지하철 역이름들이 업데이트되면, 
                                // 이를 App.js의 상태값으로 등록하는 함수
    }
  */
  constructor(props) {
    super(props);
    this.declareConstants();
    this.initializeState(); 

    this.constructHTMLElements();
    this.addClickEventListener();
    this.appendChildNodes();    
    clearInputValue(this.$stationNameInput);

    this.render();
  }

  declareConstants() {
    this.STATION_ADD_BUTTON_ID = "station-add-button";
    this.STATION_NAME_INPUT_ID = "station-name-input";
    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  initializeState() {
    const { initialStationNameArray } = this.props;

    this.state = {
      stationNameArray: initialStationNameArray // 이미 사전순으로 정렬이 되어 있다
    };
  }

  constructHTMLElements() {
    this.$stationNameNav = createHTMLElement({ tagname: "nav", classList: ["station-name-nav"] });
    this.$stationNameLabel = this.createStationNameLabel();

    this.$stationNameInputContainer = createDivHTMLElement(
      { classList: ["station-name-nav__station-name-input-container"] });
    this.$stationNameInput = this.createStationNameInput();
    this.$stationAddButton = this.createStationAddButton();

    this.$stationNameMain = createHTMLElement({ tagname: "main"});
    this.$stationNameListTitle = createHTMLElement({tagname:"h3", innerText: "🚉 지하철 역 목록" });
    this.$stationNameList = createDivHTMLElement({classList: ["station-name-list"] });
  }

  createStationNameLabel() {
    return createLabelHTMLElement({
      name: "역 이름",
      htmlFor: this.STATION_NAME_INPUT_ID,
      classList: [
        "station-name-nav__station-name-label",
        classname.H3LISH,
        classname.STRONG
      ]
    });
  }

  createStationNameInput() {
    return createInputHTMLElement({
      type: "text",
      id: this.STATION_NAME_INPUT_ID,
      placeholder: "역 이름을 입력해주세요.",
      classList: ["station-name-nav__station-name-input"],
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleStationAdd();
        }
      }
    });
  }

  createStationAddButton() {
    return createButtonHTMLElement({
      id: this.STATION_ADD_BUTTON_ID,
      name: "역 추가",
      classList: [
        "station-name-nav__station-add-button",
        classname.MEDIUM_BUTTON,
        classname.CENTER
      ]
    });
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id, classList } } = e;
      const { target: { dataset: { stationName } } } = e;

      if (id === this.$stationAddButton.id) {
        this.handleStationAdd();
      } else if (classList.contains(this.STATION_DELETE_BUTTON_CLASSNAME)) {
        this.handleDeleteButton(stationName);
      }
    });
  }

  handleStationAdd() {
    const newStationName = this.$stationNameInput.value;
    if (this.isValidStationName(newStationName)) {
      this.setStationNameArray([ ...this.state.stationNameArray, newStationName ]);
      clearInputValue(this.$stationNameInput);
    }
  }

  isValidStationName(stationNameUserInput) {
    try {
      this.validateUniqueStationName(stationNameUserInput);
      this.validateStationNameLength(stationNameUserInput);

      return true;
    } catch (error) {
      this.controlStationNameError(stationNameUserInput, error);

      return false;      
    }
  }

  validateUniqueStationName(stationNameUserInput) {
    const { stationNameArray } = this.state;

    if (stationNameArray.some(stationName => stationName === stationNameUserInput)) {
      throwErrorWithMessage("중복된 지하철 역 이름은 등록될 수 없습니다.");
    }
  }

  validateStationNameLength(stationNameUserInput) {
    const MIN_STATION_NAME_LENGTH = 2;

    if (stationNameUserInput.length < MIN_STATION_NAME_LENGTH) {
      throwErrorWithMessage("지하철 역은 2글자 이상이어야 합니다.");
    }
  }

  controlStationNameError(stationNameUserInput, error) {
    const alertMessage = [
      `입력된 지하철 역 이름: ${stationNameUserInput}`,
      `${error.message}`,
      `다시 입력해주세요`
    ].join("\n");

    alert(alertMessage);
    clearInputValue(this.$stationNameInput);
  }

  handleDeleteButton(targetStationName) {      
    if (confirm(`${targetStationName}을 삭제하시겠습니까?`)) {
      const matchedLineNameArray = this.getMatchedLineName(targetStationName);

      if (matchedLineNameArray.length > 0) {
        alert(`${targetStationName}은 ${matchedLineNameArray.join(", ")}에 등록되어 있어 삭제할 수 없습니다.`);
      } else {
        const targetExcluded = this.state.stationNameArray.filter(stationName => stationName !== targetStationName);
        this.setStationNameArray(targetExcluded);
      }
    }
  }

  getMatchedLineName(stationName) {
    const { lineInfo } = this.props;
    const matchedLineInfo = lineInfo.filter(({ stations }) => stations.includes(stationName));
    const matchedLineName = matchedLineInfo.map(({ lineName }) => lineName);

    return matchedLineName;
  }

  setStationNameArray(stationNameArray) {
    this.setState({ stationNameArray });
  }

  appendChildNodes() {
    this.$component.append(this.$stationNameNav,this.$stationNameMain);
    this.$stationNameNav.append(this.$stationNameLabel, this.$stationNameInputContainer);
    this.$stationNameInputContainer.append(this.$stationNameInput, this.$stationAddButton);
    this.$stationNameMain.append(this.$stationNameListTitle,this.$stationNameList);
  }

  setState(state) {
    super.setState(state);

    const { stationNameArray } = this.state;
    const { setStationNameArray } = this.props;

    setStationNameArray(stationNameArray);
  }

  render() {
    const { stationNameArray } = this.state;

    this.$stationNameList.innerHTML = "";

    if (stationNameArray.length === 0) {
      this.renderNoStationMessage();
    } else {
      this.renderStationNameList();
    }
  }

  renderNoStationMessage() {
    const $noStationMessage = createDivHTMLElement({ innerText: "등록된 지하철 역이 없습니다." });

    this.$stationNameList.append($noStationMessage);
  }

  renderStationNameList() {
    const $childNodes = this.createStationNameChildNodes();

    this.$stationNameList.append(...$childNodes);
  }

  createStationNameChildNodes() {
    const { stationNameArray } = this.state;

    return stationNameArray.reduce(($acc, stationName ) => {
      const $stationName = createDivHTMLElement({ innerText: stationName , classList: [classname.CENTER]});
      const $stationDeleteButton = this.createStationDeleteButton({ stationName });

      return [...$acc, $stationName, $stationDeleteButton];
    }, this.createStationListHeaderArray());
  }

  createStationDeleteButton({ stationName }) {
    return createButtonHTMLElement({
      name: "삭제",
      classList: [this.STATION_DELETE_BUTTON_CLASSNAME],
      dataset: { stationName }
    });
  }

  createStationListHeaderArray() {
    const $nameHeader = createDivHTMLElement({
      innerText: "역 이름",
      classList: ["station-name-list__header", classname.CENTER, classname.STRONG]
    });

    const $buttonHeader = createDivHTMLElement({
      innerText: "설정",
      classList: ["station-name-list__header", classname.CENTER, classname.STRONG]
    });

    return [$nameHeader, $buttonHeader];
  }
}
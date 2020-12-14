import Component from "./Component.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement,
  retrieveLineInfo,
  retrieveStationInfo,
  storeStationInfo,
  throwErrorWithMessage
} from "./util.js";

/* StationManager가 관리하는 상태값을 아래와 같다. 다른 Manager가 관리하는 상태값은 localStorage에서 가져올 수 있다.
  state: {
    stationInfo: [
      {
        stationName: string // 역 이름
        lineName   : string // 해당 역이 속한 노선 이름
      }
    ]
  }
*/
export default class StationManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.declareConstants();
    this.initializeState(); 
    this.initializeVariable();

    this.constructHTMLElements();
    this.addClickEventListener();
    this.appendChildNodes();    
    clearInputValue(this.$stationNameInput);

    this.render();
  }

  declareConstants() {
    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  initializeState() {
    this.state = {
      stationInfo: retrieveStationInfo()
        .sort(({ stationName: aStationName }, { stationName: bStationName }) => {
          return aStationName < bStationName ? -1 : 1;
        })
    };
  }

  initializeVariable() {
    this.lineInfo = retrieveLineInfo();
  }

  constructHTMLElements() {
    this.$stationNameInput = this.createStationNameInput();
    this.$stationNameLabel = this.createStationNameLabel();
    this.$stationAddButton = this.createStationAddButton();

    this.$stationNameListTitle = createDivHTMLElement({ innerText: "🚉 지하철 역 목록" });
    this.$stationNameList = createDivHTMLElement({});
  }

  createStationNameInput() {
    return createInputTextHTMLElement({
      id: "station-name-input",
      placeholder: "역 이름을 입력해주세요.",
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleStationAdd();
        }
      }
    });
  }

  createStationNameLabel() {
    return createLabelHTMLElement({
      name: "역 이름",
      htmlFor: this.$stationNameInput.id
    });
  }

  createStationAddButton() {
    return createButtonHTMLElement({
      id: "station-add-button",
      name: "역 추가",
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
      this.addNewStationName(newStationName);    
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
    const { stationInfo } = this.state;

    if (stationInfo.some(({ stationName }) => stationName === stationNameUserInput)) {
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

  addNewStationName(newStationName) {
    this.setState({
      stationInfo: [
        ...this.state.stationInfo,
        {
          stationName: newStationName,
        }
      ]
    });
  }

  handleDeleteButton(targetStationName) {      
    if (confirm(`${targetStationName}을 삭제하시겠습니까?`)) {
      const matchedLineNameArray = this.getMatchedLineName(targetStationName);

      if (matchedLineNameArray.length > 0) {
        alert(`${targetStationName}은 ${matchedLineNameArray.join(", ")}에 등록되어 있어 삭제할 수 없습니다.`);
      } else {
        const targetExcludedStationInfo = this.state.stationInfo.filter(({ stationName }) => stationName !== targetStationName);
        this.setStationInfoArray(targetExcludedStationInfo);
      }
    }
  }

  getMatchedLineName(stationName) {
    const matchedLineInfo = this.lineInfo.filter(({ stations }) => stations.includes(stationName));
    const matchedLineName = matchedLineInfo.map(({ lineName }) => lineName);

    return matchedLineName;
  }

  setStationInfoArray(stationInfo) {
    this.setState({ stationInfo });
  }

  appendChildNodes() {
    this.$component.append(
      this.$stationNameLabel,
      this.$stationNameInput,
      this.$stationAddButton,
      this.$stationNameListTitle,
      this.$stationNameList
    );
  }

  setState(state) {
    super.setState(state);

    storeStationInfo(this.state.stationInfo);
  }

  render() {
    const { stationInfo } = this.state;

    this.$stationNameList.innerHTML = "";

    if (stationInfo.length === 0) {
      const $noStationMessage = createDivHTMLElement({ innerText: "등록된 지하철 역이 없습니다." });

      this.$stationNameList.append($noStationMessage);
    } else {
      const $childNodes = this.createStationNameChildNodes();

      this.$stationNameList.append(...$childNodes);
    }
  }

  createStationNameChildNodes() {
    const { stationInfo } = this.state;

    return stationInfo.reduce(($acc, { stationName }) => {
      const $stationName = createDivHTMLElement({ innerText: stationName });
      const $stationDeleteButton = this.createStationDeleteButton({ stationName });

      return [...$acc, $stationName, $stationDeleteButton];
    }, []);
  }

  createStationDeleteButton({ stationName }) {
    return createButtonHTMLElement({
      name: "삭제",
      classList: [this.STATION_DELETE_BUTTON_CLASSNAME],
      dataset: { stationName }
    });
  }
}
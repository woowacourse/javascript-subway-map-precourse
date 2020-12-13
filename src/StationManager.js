import Component from "./Component.js";
import { STATION_INFO_LOCAL_STORAGE_KEY } from "./constant.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement
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

    this.constructHTMLElements();
    this.addClickEventListener();
    this.appendChildNodes();
    
    clearInputValue(this.$stationNameInput);

    if (this.state.stationInfo.length > 0) {
      this.render();
    }
  }

  declareConstants() {
    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  initializeState() {
    const storedState = JSON.parse(localStorage.getItem(STATION_INFO_LOCAL_STORAGE_KEY));
    
    this.state = storedState || { stationInfo: [] };
  }

  constructHTMLElements() {
    this.$stationNameInput = this.createStationNameInput();
    this.$stationNameLabel = this.createStationNameLabel();
    this.$stationAddButton = this.createStationAddButton();

    this.$stationNameList = createDivHTMLElement({});

    this.childNodes = [this.$stationNameLabel, this.$stationNameInput, this.$stationAddButton, this.$stationNameList];
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
      throw new Error("중복된 지하철 역 이름은 등록될 수 없습니다.");
    }
  }

  validateStationNameLength(stationNameUserInput) {
    const MIN_STATION_NAME_LENGTH = 2;

    if (stationNameUserInput.length < MIN_STATION_NAME_LENGTH) {
      throw new Error("지하철 역은 2글자 이상이어야 합니다.");
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
      const targetExcluded = this.state.stationInfo.filter(({ stationName }) => stationName !== targetStationName);
      this.setStationInfoArray(targetExcluded);
    }
  }

  setStationInfoArray(stationInfo) {
    this.setState({ stationInfo });
  }

  appendChildNodes() {
    this.$component.append(...this.childNodes);
  }

  setState(state) {
    super.setState(state);

    localStorage.setItem(STATION_INFO_LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  }

  render() {
    this.$stationNameList.innerHTML = "<div>🚉 지하철 역 목록</div>";
    const $childNodes = this.state.stationInfo.reduce((acc, { stationName }) => {
      const $stationName = createDivHTMLElement({innerText: stationName});
      const $stationDeleteButton = createButtonHTMLElement({
        name: "삭제",
        classList: [this.STATION_DELETE_BUTTON_CLASSNAME],
        dataset: { stationName }
      });

      return [...acc, $stationName, $stationDeleteButton];
    }, []);

    this.$stationNameList.append(...$childNodes);
  }
}
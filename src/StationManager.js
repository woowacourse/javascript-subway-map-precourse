import Component from "./Component.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement
} from "./util.js";

export default class StationManager extends Component {
  constructor({ $parent }) {
    super({ $parent });

    this.declareConstants();
    this.initializeState(); 

    this.constructHTMLElements();
    this.addClickEventListener();
    this.appendChildNodes();
    
    clearInputValue(this.$stationNameInput);
  }

  declareConstants() {
    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  initializeState() {
    this.state = {
      stationName: []
    };
  }

  constructHTMLElements() {
    this.$stationNameLabel = this.createStationNameLabel();
    this.$stationNameInput = this.createStationNameInput();
    this.$stationAddButton = this.createStationAddButton();

    this.$stationNameList = createDivHTMLElement({});

    this.childNodes = [this.$stationNameLabel, this.$stationNameInput, this.$stationAddButton, this.$stationNameList];
  }

  createStationNameLabel() {
    return createLabelHTMLElement({
      name: "역 이름",
      htmlFor: "station-name-input"
    });
  }

  createStationNameInput() {
    return createInputTextHTMLElement({
      id: "station-name-input",
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleStationAdd();
        }
      }
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
      const { target: { dataset: { stationNameIndex } } } = e;

      if (id === this.$stationAddButton.id) {
        this.handleStationAdd();
      } else if (classList.contains(this.STATION_DELETE_BUTTON_CLASSNAME)) {
        this.handleDeleteButton(stationNameIndex);
      }
    });
  }

  handleStationAdd() {
    const newStationName = this.$stationNameInput.value;
    this.addNewStationName(newStationName);    
    clearInputValue(this.$stationNameInput);
  }

  addNewStationName(newStationName) {
    this.setState({
      stationName: [
        ...this.state.stationName,
        newStationName
      ]
    });
  }

  handleDeleteButton(targetIndex) {
    const targetStationName = this.state.stationName[targetIndex];
      
    if (confirm(`${targetStationName}을 삭제하시겠습니까?`)) {
      const targetExcluded = this.state.stationName.filter(stationName => stationName !== targetStationName);
      this.setStationNameArray(targetExcluded);
    }
  }

  setStationNameArray(stationName) {
    this.setState({ stationName });
  }

  appendChildNodes() {
    this.$component.append(...this.childNodes);
  }

  render() {
    this.$stationNameList.innerHTML = "<div>🚉 지하철 역 목록</div>";
    const $childNodes = this.state.stationName.reduce((acc, stationName, index) => {
      const $stationName = createDivHTMLElement({innerText: stationName});
      const $stationDeleteButton = createButtonHTMLElement({
        name: "삭제",
        classList: [this.STATION_DELETE_BUTTON_CLASSNAME],
        dataset: { "stationNameIndex": index }
      });

      return [...acc, $stationName, $stationDeleteButton];
    }, []);

    this.$stationNameList.append(...$childNodes);
  }
}
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
      const { target } = e;

      if (target.id === this.$stationAddButton.id) {
        this.handleStationAdd();
      } else if (target.classList.contains(this.STATION_DELETE_BUTTON_CLASSNAME)) {
      // TODO: 사용자가 삭제 버튼을 누를 경우, 역 이름을 삭제하여 지하철 역 목록을 재표시하는 기능 구현
        console.log(`삭제 버튼이 클릭되었습니다. ${target.dataset.stationNameIndex}`);
      }
    });
  }

  handleStationAdd() {
    const newStationName = this.$stationNameInput.value;
    this.setState({
      stationName: [
        ...this.state.stationName,
        newStationName
      ]
    });
    
    clearInputValue(this.$stationNameInput);
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
import Component from "./Component.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputNumberHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  getStationNameArray,
  getStations
} from "./util.js";

export default class SectionMain extends Component {
  constructor({ $parent, lineName }) {
    super({ $parent, lineName });
    this.declareConstants();
    this.initializeState();
    this.initializeVariables();

    this.constructHTMLElements();
    this.appendChildNodes();

    this.addClickEventListener();

    this.render();
  }

  declareConstants() {
    this.SECTION_DELETE_BUTTON_CLASSNAME = "section-delete-button";
  }  
  
  initializeState() {
    this.state = {
      stations: getStations(this.props.lineName)
    };
  }

  initializeVariables() {
    this.stationsArray = getStationNameArray();
  }

  constructHTMLElements() {
    this.$sectionMainTitle = createDivHTMLElement({ innerText: `${this.props.lineName} 관리` });
    
    this.$sectionStationSelector = this.createSectionStationSelector();
    this.$sectionStationLabel = this.createSectionStationLabel();

    this.$sectionOrderInput = this.createSectionOrderInput();
    this.$sectionAddButton = createButtonHTMLElement({ id: "section-add-button", name: "등록"});

    this.$sectionStationList = createDivHTMLElement({});
  }

  createSectionStationSelector() {
    return createSelectHTMLElement({
      id: "section-station-selector",
      options: this.getExcludedStationsArray()
    });
  }

  getExcludedStationsArray() {
    const { stations } = this.state;
    
    return this.stationsArray.filter(stationName => !stations.includes(stationName));
  }

  createSectionStationLabel() {
    return createLabelHTMLElement({
      name: "구간 등록",
      htmlFor: this.$sectionStationSelector.id
    });
  }

  createSectionOrderInput() {
    const $input = createInputNumberHTMLElement({
      id: "section-order-input",
      placeholder: "순서"
    });

    $input.step = 1;

    return $input;
  }

  appendChildNodes() {
    this.$component.append(
      this.$sectionMainTitle,
      this.$sectionStationLabel,
      this.$sectionStationSelector,
      this.$sectionOrderInput,
      this.$sectionAddButton,
      this.$sectionStationList
    );
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id, classList } } = e;
      const { target: { dataset: { stationName, order } } } = e;

      if (id === this.$sectionAddButton.id) {
        this.handleSectionAdd();
      } else if (classList.contains(this.SECTION_DELETE_BUTTON_CLASSNAME)) {
        this.handleSectionDeleteButton(stationName);
      }
    });
  }

  handleSectionAdd() {
    const stationName = this.$sectionStationSelector.value;
    const sectionOrderNumber = Number(this.$sectionOrderInput.value);

    if (this.isValidSectionInfo(stationName, sectionOrderNumber)) {
      this.addNewSection(stationName, sectionOrderNumber);
      this.updateSectionStationSelectorOptions();
    }
  }

  isValidSectionInfo(stationName, sectionOrderNumber) {
    try {
      this.validateStationName(stationName);
      this.validateSectionOrderNumber(sectionOrderNumber);

      return true;
    } catch (error) {
      alert(error.message);
      
      return false;      
    } finally {
      clearInputValue(this.$sectionOrderInput);
      clearInputValue(this.$sectionStationSelector);
    }
  }

  validateStationName(stationName) {
    if (stationName === "") {
      const errorMessage = [`구간 등록할 지하철 역을 선택해주세요.`].join("\n");
      
      throw new Error(errorMessage);
    }
  }

  validateSectionOrderNumber(sectionOrderNumber) {
    if (!Number.isInteger(sectionOrderNumber)) {
      const errorMessage = [
        `구간 순서는 정수이어야 합니다.`,
        `입력된 구간 순서: ${sectionOrderNumber}`
      ].join("\n");

      throw new Error(errorMessage);
    }
  }

  addNewSection(stationName, sectionOrderInteger) {
    if (sectionOrderInteger < 0) {
      sectionOrderInteger = 0;
    }

    const { stations } = this.state;
    const before = stations.slice(0, sectionOrderInteger);
    const after = stations.slice(sectionOrderInteger);
  
    this.setState({
      stations: [...before, stationName, ...after]
    });

    console.log(this.state.stations);
  }

  updateSectionStationSelectorOptions() {
    this.$sectionStationSelector.innerHTML = this.getExcludedStationsArray()
      .map(stationName => `<option>${stationName}</option>`).join("");
  }

  handleSectionDeleteButton(targetStationName) {
    const MIN_STATIONS_LENGTH = 2;
    const { stations } = this.state;

    if (stations.length <= MIN_STATIONS_LENGTH) {
      alert(`노선에 포함된 역이 두개 이하이므로 ${targetStationName}역을 제거할 수 없습니다.`);
    } else if (confirm(`${targetStationName}을 삭제하시겠습니까?`)) {
      const targetExcluded = stations.filter(stationName => stationName !== targetStationName);

      this.setState({ stations: targetExcluded });
    }
  }

  render() {
    this.$sectionStationList.innerHTML = "";

    const $childNodes = this.state.stations.reduce((acc, stationName, order) => {
      const $order = createDivHTMLElement({ innerText: order });
      const $stationName = createDivHTMLElement({ innerText: stationName });
      const $sectionDeleteButton = this.createSectionDeleteButton({ stationName, order });
      
      return [...acc, $order, $stationName, $sectionDeleteButton];
    }, []);

    this.$sectionStationList.append(...$childNodes);
  }

  createSectionDeleteButton({stationName, order}) {
    return createButtonHTMLElement({
      name: "노선에서 제거",
      classList: [this.SECTION_DELETE_BUTTON_CLASSNAME],
      dataset: {
        stationName,
        order,
      }
    });
  }
}
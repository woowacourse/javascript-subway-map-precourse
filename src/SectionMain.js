import Component from "./Component.js";
import { classname } from "./constant.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createHTMLElement,
  createListHeaderHTMLElement,
  createDivHTMLElement,
  createInputNumberHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  throwErrorWithMessage
} from "./util.js";
/*
  SectionMain이 관리하는 상태값은 아래와 같다.
  state: {
    stations: [string] // 현재 선택된 지하철 노선에 속해져 있는 지하철 역 이름들
  }
   
*/
export default class SectionMain extends Component {
  /*  props: { 
    $parent, 
    lineName,         // 현재 선택된 지하철 노선 이름
    initialStations,  // 현재 선택된 지하철 노선에 속한 지하철 역 이름들의 초기값
    stationNameArray, // 등록된 모든 지하철 역 이름들
    lineInfo,         // 등록된 모든 지하철 노선 정보
    setStations       // 해당 지하철 노선에 속한 지하철 역 이름들이 업데이트되면 
                      // 해당 지하철 노선 정보를 업데이트하여 App.js의 상태값으로 저장하는 함수
  } 
  */
  constructor(props) {
    super(props);
    this.declareConstants();
    this.initializeState();

    this.constructHTMLElements();
    this.appendChildNodes();

    this.addClickEventListener();

    this.render();
    clearInputValue(this.$sectionOrderInput);
  }

  declareConstants() {
    this.SECTION_DELETE_BUTTON_CLASSNAME = "section-delete-button";
    this.SECTION_STATION_SELECTOR_ID = "section-station-selector";
  }  
  
  initializeState() {
    const { initialStations } = this.props;

    this.state = {
      stations: initialStations
    };
  }

  constructHTMLElements() {
    this.$sectionMainTitle = this.createSectionMainTitle();
    
    this.$sectionStationLabel = this.createSectionStationLabel();

    this.$sectionInputContainer = createDivHTMLElement({ classList: ["section-input-container"] });
    this.$sectionStationSelector = this.createSectionStationSelector();
    this.$sectionOrderInput = this.createSectionOrderInput();
    this.$sectionAddButton = this.createSectionAddButton();

    this.$sectionStationList = createHTMLElement({classList: ["section-station-list"]});
  }

  createSectionMainTitle() {
    const { lineName } = this.props;
    
    return createHTMLElement({
      tagname: "h3",
      innerText: `${lineName} 관리`
    });
  }

  createSectionStationLabel() {
    return createLabelHTMLElement({
      name: "구간 등록",
      htmlFor: this.SECTION_STATION_SELECTOR_ID,
      classList: ["section-station-label"]
    });
  }

  createSectionStationSelector() {
    return createSelectHTMLElement({
      id: this.SECTION_STATION_SELECTOR_ID,
    });
  }

  createSectionOrderInput() {
    const $input = createInputNumberHTMLElement({
      id: "section-order-input",
      placeholder: "순서", 
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleSectionAdd();
        }
      }
    });

    $input.step = 1;

    return $input;
  }

  createSectionAddButton() {
    return createButtonHTMLElement({
      id: "section-add-button",
      name: "등록",
      classList: [classname.MEDIUM_BUTTON, classname.CENTER]
    });
  }

  appendChildNodes() {
    this.$component.append(
      this.$sectionMainTitle,
      this.$sectionStationLabel,
      this.$sectionInputContainer,
      this.$sectionStationList
    );

    this.$sectionInputContainer.append(
      this.$sectionStationSelector,
      this.$sectionOrderInput,
      this.$sectionAddButton
    );    
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id, classList } } = e;
      const { target: { dataset: { stationName } } } = e;

      if (id === this.$sectionAddButton.id) {
        this.handleSectionAdd();
      } else if (classList.contains(this.SECTION_DELETE_BUTTON_CLASSNAME)) {
        this.handleSectionDeleteButton(stationName);
      }
    });
  }

  handleSectionAdd() {
    const stationName = this.$sectionStationSelector.value;
    const sectionOrderString = this.$sectionOrderInput.value;

    if (this.isValidSectionInfo(stationName, sectionOrderString)) {
      const updatedStations = this.getUpdatedStations(stationName, sectionOrderString);
      this.setState({ stations: updatedStations });
    }
  }

  isValidSectionInfo(stationName, sectionOrderString) {
    try {
      this.validateStationName(stationName);
      this.validateSectionOrder(sectionOrderString);

      clearInputValue(this.$sectionStationSelector);      
      clearInputValue(this.$sectionOrderInput);

      return true;
    } catch (error) {
      alert(error.message);
      
      return false;
    }
  }

  validateStationName(stationName) {
    if (stationName === "") {
      clearInputValue(this.$sectionStationSelector);
      
      throwErrorWithMessage(`구간 등록할 지하철 역을 선택해주세요.`);
    }
  }

  validateSectionOrder(sectionOrderString) {
    const sectionOrderNumber = Number(sectionOrderString);
      
    if (sectionOrderString === "") {
      clearInputValue(this.$sectionOrderInput);

      throwErrorWithMessage(`구간 순서를 입력해주세요`);      
    } else if (!Number.isInteger(sectionOrderNumber)) {
      clearInputValue(this.$sectionOrderInput);

      throwErrorWithMessage([`구간 순서는 정수이어야 합니다.`,`입력된 구간 순서: ${sectionOrderNumber}`].join("\n"));
    }
  }

  getUpdatedStations(stationName, sectionOrderString) {
    const { stations } = this.state;

    const safeSectionOrderInteger = Math.max(0, Number(sectionOrderString));

    const before = stations.slice(0, safeSectionOrderInteger);
    const after = stations.slice(safeSectionOrderInteger);
    
    return [...before, stationName, ...after];
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

  setState(state) {
    super.setState(state);

    const { stations } = this.state;
    const { setStations } = this.props;

    setStations(stations);
  }

  render() {
    this.renderSectionStationSelectorOptions();
    this.renderSectionStationList();
  }
  
  renderSectionStationSelectorOptions() {
    this.$sectionStationSelector.innerHTML = "";

    const $options = this.getNotRegisteredStationsArray().reduce((acc, stationName) => {
      const $option = document.createElement("option");
      $option.innerText = stationName;

      return [...acc, $option];
    }, []);

    this.$sectionStationSelector.append(...$options);
  }

  getNotRegisteredStationsArray() {
    const { stationNameArray } = this.props;
    const { stations } = this.state;
    
    return stationNameArray.filter(stationName => !stations.includes(stationName));
  }

  renderSectionStationList() {
    this.$sectionStationList.innerHTML = "";

    const $childNodes = this.state.stations.reduce((acc, stationName, order) => {
      const $order = createDivHTMLElement({ innerText: order, classList: [classname.CENTER] });
      const $stationName = createDivHTMLElement({ innerText: stationName, classList: [classname.CENTER] });
      const $sectionDeleteButton = this.createSectionDeleteButton({ stationName });
      
      return [...acc, $order, $stationName, $sectionDeleteButton];
    }, this.createSectionStationListHeaderArray());

    this.$sectionStationList.append(...$childNodes);
  }

  createSectionDeleteButton({stationName}) {
    return createButtonHTMLElement({
      name: "노선에서 제거",
      classList: [this.SECTION_DELETE_BUTTON_CLASSNAME],
      dataset: { stationName }
    });
  }

  createSectionStationListHeaderArray() {
    const SECTION_STATION_LIST__HEADER_CLASSNAME = "section-station-list__header";

    const $orderHeader = createListHeaderHTMLElement({ innerText: "순서", className: SECTION_STATION_LIST__HEADER_CLASSNAME });
    const $stationNameHeader = createListHeaderHTMLElement({ innerText: "이름", className: SECTION_STATION_LIST__HEADER_CLASSNAME});
    const $buttonHeader = createListHeaderHTMLElement({ innerText: "설정", className: SECTION_STATION_LIST__HEADER_CLASSNAME });

    return [$orderHeader, $stationNameHeader, $buttonHeader];
  }
}
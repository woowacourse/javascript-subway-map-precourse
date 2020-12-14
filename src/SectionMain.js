import Component from "./Component.js";
import {
  clearInputValue,
  createButtonHTMLElement,
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
  }

  declareConstants() {
    this.SECTION_DELETE_BUTTON_CLASSNAME = "section-delete-button";
  }  
  
  initializeState() {
    const { initialStations } = this.props;

    this.state = {
      stations: initialStations
    };
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
    });
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
      const $order = createDivHTMLElement({ innerText: order });
      const $stationName = createDivHTMLElement({ innerText: stationName });
      const $sectionDeleteButton = this.createSectionDeleteButton({ stationName });
      
      return [...acc, $order, $stationName, $sectionDeleteButton];
    }, []);

    this.$sectionStationList.append(...$childNodes);
  }

  createSectionDeleteButton({stationName}) {
    return createButtonHTMLElement({
      name: "노선에서 제거",
      classList: [this.SECTION_DELETE_BUTTON_CLASSNAME],
      dataset: { stationName }
    });
  }
}
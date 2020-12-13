import Component from "./Component.js";
import {
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

  render() {
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
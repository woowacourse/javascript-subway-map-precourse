import Component from "./Component.js";
import {
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputNumberHTMLElement,
  createLabelHTMLElement,
  createSelectHTMLElement,
  getStations
} from "./util.js";

export default class SectionMain extends Component {
  constructor({ $parent, lineName }) {
    super({ $parent, lineName });
    this.initializeVariables();

    this.constructHTMLElements();
    this.appendChildNodes();
  }

  initializeVariables() {
    this.stationsArray = getStations(this.props.lineName);
  }

  constructHTMLElements() {
    this.$sectionMainTitle = createDivHTMLElement({ innerText: `${this.props.lineName} 관리` });
    
    this.$sectionStationSelector = this.createSectionStationSelector();
    this.$sectionStationLabel = this.createSectionStationLabel();

    this.$sectionOrderInput = this.createSectionOrderInput();
    this.$sectionAddButton = createButtonHTMLElement({ id: "section-add-button", name: "등록"});
  }

  createSectionStationSelector() {
    return createSelectHTMLElement({
      id: "section-station-selector",
      options: this.stationsArray
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
      this.$sectionAddButton
    );
  }
}
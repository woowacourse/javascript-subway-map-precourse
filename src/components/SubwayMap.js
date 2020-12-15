import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";

const buttonContentMap = {
  "station-manager-button": "station-manager-container",
  "line-manager-button": "line-manager-container",
  "section-manager-button": "section-manager-container",
  "map-print-manager-button": "map-print-manager-container",
};

export class SubwayMap {
  constructor() {
    this.props = {
      clickHeaders: this.onHeaderClick,
    };
    this.initiateDOM();
    this.render(this.props);
  }

  initiateDOM = () => {
    this.content = new ContentContainer();
    this.header = new HeaderButtons();
  };

  render = (props) => {
    this.header.render(props);
    this.content.render(props);
  };

  onHeaderClick = (e) => {
    const { id } = e.currentTarget;
    const contentId = buttonContentMap[id];

    this.content.render({ ...this.props, id: contentId });
  };
}

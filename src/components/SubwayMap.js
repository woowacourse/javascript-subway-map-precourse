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
    localStorage.clear(); //지우고제출
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

  render = () => {
    this.header.render(this.props);
    this.content.render(this.props);
  };

  onHeaderClick = (e) => {
    const { id } = e.currentTarget;
    const contentId = buttonContentMap[id];

    this.content.render({ ...this.props, id: contentId });
  };
}

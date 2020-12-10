import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
export class SubwayMap {
  constructor() {
    this.initiateDOM();
  }

  initiateDOM = () => {
    this.contentContainer = new ContentContainer();
    new HeaderButtons({ clickHeaders: this.clickHeaders });
  };

  clickHeaders = (index) => {
    this.contentContainer.changeVisiblity(index);
  };
}

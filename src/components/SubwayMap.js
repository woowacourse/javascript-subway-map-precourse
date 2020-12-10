import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
import { StationManager } from "./station-manager/StationManager.js";
export class SubwayMap {
  constructor() {
    this.initiateDOM();
    localStorage.setItem("stations", JSON.stringify([]));
  }

  initiateDOM = () => {
    this.contentContainer = new ContentContainer();
    new HeaderButtons({ clickHeaders: this.clickHeaders });
    new StationManager({
      setStationNames: this.setStationNames,
      getStationNames: this.getStationNames,
    });
  };

  clickHeaders = (index) => {
    this.contentContainer.changeVisiblity(index);
  };

  setStationNames = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
  };

  getStationNames = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };
}

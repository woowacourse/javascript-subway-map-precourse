import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
import { StationManager } from "./station-manager/StationManager.js";
export class SubwayMap {
  constructor() {
    this.initiateDOM();
    localStorage.setItem("stations", []);
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
    localStorage.setItem("stations", names);
  };

  getStationNames = () => {
    return localStorage.getItem("stations");
  };
}

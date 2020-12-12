import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";

const buttonContentMap = {
  "station-manager-button": "station-manager-container",
  "line-manager-button": "line-manager-container",
  "section-manager-button": "section-manager-container",
  "map-print-manager-button": "map-print-manager-container",
};
export class SubwayMap {
  constructor() {
    this.initiateDOM();
    localStorage.setItem("stations", JSON.stringify([]));
  }

  initiateDOM = () => {
    this.contentContainer = new ContentContainer();
    new HeaderButtons({ clickHeaders: this.onHeaderClick });
    new StationManager({
      setStations: this.setStations,
      getStations: this.getStations,
      deleteStation: this.deleteStation,
    });
    new LineManager({ getStations: this.getStations });
  };
  onHeaderClick = (e) => {
    const { id } = e.currentTarget;
    const contentId = buttonContentMap[id];
    this.contentContainer.render({ id: contentId });
  };

  setStations = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
  };

  getStations = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };

  deleteStation = (target) => {
    let stations = this.getStations();
    stations = stations.filter((station) => {
      // TODOS: 노선에 등록되어있는지 확인.
      return station !== target;
    });
    this.setStations(stations);
  };
}

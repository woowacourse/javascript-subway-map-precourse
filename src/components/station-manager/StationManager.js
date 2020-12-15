import { StationManagerInput } from "./StationManagerInput.js";
import { StationManagerList } from "./StationManagerList.js";
import { display } from "../../utils/handleDom.js";

export class StationManager {
  id = "station-manager-container";

  constructor(props) {
    this.props = props;
    this.getStations = props.getStations;
    this.initializeDOM(props);
  }

  initializeDOM = (props) => {
    this.manager = document.getElementById("station-manager-container");
    this.stationInput = new StationManagerInput({
      ...props,
      addNewStation: this.addNewStation,
    });
    this.stationList = new StationManagerList({
      ...props,
      deleteStation: this.deleteStation,
    });
  };

  render = (props) => {
    display(props.isShow, this.manager);
    this.onUpdate = props.onUpdate;
    this.stationList.render();
  };

  addNewStation = (stations) => {
    this.setStations(stations);
  };

  setStations = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
    this.onUpdate();
  };

  deleteStation = (target) => {
    let stations = this.getStations();
    stations = stations.filter((station) => {
      return station !== target;
    });
    this.setStations(stations);
  };
}

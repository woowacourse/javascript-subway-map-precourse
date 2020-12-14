import { StationManagerInput } from "./StationManagerInput.js";
import { StationManagerList } from "./StationManagerList.js";
export class StationManager {
  constructor(props) {
    this.props = props;
    this.getStations = props.getStations;
    this.updateStationView = props.updateStationView;
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
    this.stationList.render(props);
  };

  addNewStation = (stations) => {
    this.setStations(stations);
    this.stationList.render();
  };

  setStations = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
    this.updateStationView();
  };

  deleteStation = (target) => {
    let stations = this.getStations();
    stations = stations.filter((station) => {
      return station !== target;
    });
    this.setStations(stations);
  };
}

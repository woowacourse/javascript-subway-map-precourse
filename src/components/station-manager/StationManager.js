import { StationManagerInput } from "./StationManagerInput.js";
import { StationManagerList } from "./StationManagerList.js";
export class StationManager {
  constructor(props) {
    this.setStations = props.setStations;
    this.getStations = props.getStations;
    this.render(props);
  }

  render = (props) => {
    new StationManagerInput({
      ...props,
      addNewStation: this.addNewStation,
    });
    console.log(props);
    this.stationList = new StationManagerList(props);
  };

  addNewStation = (stations) => {
    this.setStations(stations);
    this.stationList.render();
  };
}

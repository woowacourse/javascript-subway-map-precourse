import Station from "./station.js";
import { createSelect } from "./table.js";

class Line {
  constructor() {
    this.stations = Station.stations;
    this.showStationSelect();
  }

  showStationSelect = () => {
    const upLineSelect = document.getElementById("line-start-station-selector");
    const downLineSelect = document.getElementById("line-end-station-selector");
    createSelect(upLineSelect, this.stations);
    createSelect(downLineSelect, this.stations);
  };
}

export default new Line();

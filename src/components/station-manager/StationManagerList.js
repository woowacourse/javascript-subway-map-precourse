import { addRowInStationTable } from "../../utils/handleDom.js";
import { getStationsTableHeader } from "../../utils/templates.js";
import { MESSAGE, FIELD } from "../../constants/constants.js";
import { isInvolvedInLine } from "../../utils/validation.js";

export class StationManagerList {
  constructor(props) {
    this.getStations = props.getStations;
    this.deleteStation = props.deleteStation;
    this.getLines = props.getLines;
    this.initializeDOM();
    this.initializeEvents();
    this.render(props);
  }

  initializeDOM = () => {
    this.stationTable = document.getElementById("station-table");
  };

  initializeEvents = () => {
    document
      .querySelector("#station-table")
      .addEventListener("click", this.handleDeleteStation);
  };

  render = ({ getStations }) => {
    this.stationTable.innerHTML = getStationsTableHeader();
    this.stations = getStations();
    this.stations.forEach((station) => {
      addRowInStationTable(this.stationTable, station, FIELD.STATION);
    });
  };

  handleDeleteStation = (e) => {
    let lines = this.getLines();
    let confirmDelete = confirm(MESSAGE.DELETE_DOUBLE_CHECK);

    if (confirmDelete) {
      let station = e.target.dataset.station;

      if (!isInvolvedInLine(lines, station)) {
        this.deleteStation(station);
        this.render();
      }
    }
  };
}

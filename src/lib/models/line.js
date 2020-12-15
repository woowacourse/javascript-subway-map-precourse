import { MIN_LENGTH_OF_LINE } from "../common/constants.js";

export default class Line {
  constructor(props) {
    const { lineName, startStation, endStation, stations } = props;
    this.lineName = lineName;
    this.isNewLine = stations === undefined;
    this.stations = this.isNewLine ? [startStation, endStation] : stations;
    this.lineLength = this.stations.length;
  }

  addSectionInfo(sectionInfo) {
    const { stationName, order } = sectionInfo;
    const prevStations = this.stations.slice(0, order);
    const nextStations = this.stations.slice(order);
    this.stations = [...prevStations, stationName, ...nextStations];
  }

  deleteStation(stationName) {
    if (this.lineLength <= MIN_LENGTH_OF_LINE) return;
    const deletedStationIndex = this.stations.indexOf(stationName);
    const updatedStationList = this.stations
      .slice(0, deletedStationIndex)
      .concat(this.stations.slice(deletedStationIndex + 1, this.lineLength));
    this.stations = updatedStationList;
  }
}

import Station from './station.js';

export default function Line({ name, start, end }) {
  this.name = name;
  this.stations = [new Station(start), new Station(end)];

  this.getStart = () => {
    return this.stations[0];
  };

  this.getEnd = () => {
    return this.stations[this.stations.length - 1];
  };

  this.addStation = (station, idx) => {
    this.stations = [
      ...this.stations.slice(0, idx),
      new Station(station),
      ...this.stations.slice(idx + 1),
    ];
  };

  this.deleteStation = idx => {
    this.stations = [
      ...this.stations.slice(0, idx),
      ...this.stations.slice(idx + 1),
    ];
  };
}

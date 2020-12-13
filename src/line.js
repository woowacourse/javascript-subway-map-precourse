import Station from './station.js';

export default function Line(name, upward, downward) {
  this.name = name;
  this.stations = [new Station(upward), new Station(downward)];

  this.getUpward = () => {
    return this.stations[0];
  };

  this.getDownward = () => {
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

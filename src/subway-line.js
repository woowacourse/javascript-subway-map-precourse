export default function SubwayLine(name, upward, downward) {
  this.name = name;
  this.stations = [upward, downward];

  this.getUpward = () => {
    return this.stations[0];
  };

  this.getDownward = () => {
    return this.stations[this.stations.length - 1];
  };

  this.addStation = (station, idx) => {
    this.stations = [
      ...this.stations.slice(0, idx),
      station,
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

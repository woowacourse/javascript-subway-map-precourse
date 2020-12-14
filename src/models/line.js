export default function Line(name, stations) {
  this.name = name;
  this.stations = stations;

  this.getStart = () => {
    return this.stations[0];
  };

  this.getEnd = () => {
    return this.stations[this.stations.length - 1];
  };

  this.addStation = (station, idx) => {
    this.stations = [
      ...this.stations.slice(0, idx),
      station,
      ...this.stations.slice(idx),
    ];
  };

  this.deleteStation = idx => {
    this.stations = [
      ...this.stations.slice(0, idx),
      ...this.stations.slice(idx + 1),
    ];
  };
}

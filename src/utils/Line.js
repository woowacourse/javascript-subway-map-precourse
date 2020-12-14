export default function Line(id, name) {
  this.id = id;
  this.name = name;
  this.stations = [];

  this.setLine = (Station, index) => {
    const stationNames = this.stations.map((station) => station.name);
    if (stationNames.includes(Station)) {
      alert('이미 등록되어 있습니다');
    }
    this.stations.splice(index, 0, Station);
  };
}

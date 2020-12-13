class Station {
  constructor() {
    this.storage = window.localStorage;
  }

  getAllStations() {
    const rawStations = this.storage.getItem("stations");
    const stations = [];

    if (rawStations) {
      stations.push(...rawStations.split(","));
    }

    return stations;
  }

  hasSameName(newStationName) {
    const allStations = this.getAllStations();
    const duplicates = allStations.filter((stationName) => stationName === newStationName);
    const hasSameName = duplicates.length;

    return hasSameName;
  }
}

const station = new Station();
export default station;

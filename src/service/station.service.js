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

  createStation(stationName) {
    const allStations = this.getAllStations();
    allStations.push(stationName);

    this.storage.setItem(`stations`, allStations);
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

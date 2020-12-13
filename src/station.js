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
}

const station = new Station();
export default station;

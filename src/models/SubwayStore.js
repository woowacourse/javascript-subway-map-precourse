export const initState = {
  stations: new Set(),
};

class SubwayStore {
  constructor({ stations, lines }) {
    this.stations = stations;
    this.lines = lines;
  }

  getStations() {
    return [...this.stations];
  }
}

export default SubwayStore;

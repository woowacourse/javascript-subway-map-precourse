export default class Subway {
  constructor({ state }) {
    this._state = state;
    this._stations = state.stations;
  }

  addStation = ({ station }) => {
    this._stations.add(station);
  }

  getStationName = () => {
    return [...this._stations];
  }
}

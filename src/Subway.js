export default class Subway {
  constructor({ state }) {
    this._state = state;
    this._stations = state.stations;
  }

  isDuplicateStation = ({ station }) => {
    return this._stations.has(station);
  }

  addStation = ({ station }) => {
    if (this.isDuplicateStation({ station })) {
      return alert('중복되는 역이 존재합니다.');
    }
    this._stations.add(station);
  }

  getStationName = () => {
    return [...this._stations];
  }
}

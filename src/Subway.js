export default class Subway {
  constructor({ state }) {
    this._state = state;
    this._stations = state.stations;
    this._lines = state.lines;
  }

  isDuplicateStation = ({ station }) => {
    return this._stations.has(station);
  }

  addStation = ({ station }) => {
    if (this.isDuplicateStation({ station })) {
      return alert('중복되는 역이 존재합니다.');
    }
    if (station.length < 2) {
      return alert('역 이름은 2글자 이상이어야 합니다.');
    }
    this._stations.add(station);
  }

  deleteStation = ({ station }) => {
    this._stations.delete(station);
  }

  addLine = ({ lineName, start, end }) => {
    const section = [start, end];
    this._lines.set(lineName, section);
  }

  getStationName = () => {
    return [...this._stations];
  }

  getLines = () => {
    return [...this._lines.entries()].reduce((acc, line) => {
      const [lineName, section] = line;
      return [...acc, { lineName, section }];
    }, []);
  }
}

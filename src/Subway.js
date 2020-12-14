export default class Subway {
  constructor({ state }) {
    this._state = state;
    this._stations = state.stations;
    this._lines = state.lines;
  }

  isDuplicateStation = ({ station }) => {
    return this._stations.has(station);
  }

  isDuplicateLine = ({ lineName }) => {
    const lineNames = this.getLineNames();
    return lineNames.includes(lineName);
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
    if (lineName === '') {
      return alert('노선 이름을 입력해주세요.');
    }
    if (start === end) {
      return alert('상행 종점역과 하행 종점역이 같을 순 없습니다.');
    }
    if (this.isDuplicateLine({ lineName })) {
      return alert('중복되는 라인이 존재합니다');
    }
    const section = [start, end];
    this._lines.set(lineName, section);
  }

  deleteLine = ({ lineName }) => {
    this._lines.delete(lineName);
  }

  addSection = ({ lineName, order, station }) => {
    const section = this._lines.get(lineName);
    section.splice(order, 0, station);
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

  getLineNames = () => {
    return [...this._lines.keys()];
  }
}

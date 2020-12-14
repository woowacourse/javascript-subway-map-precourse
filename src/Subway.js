export default class Subway {
  constructor({ state }) {
    this._state = state;
    this._stations = state.stations;
    this._lines = state.lines;
  }

  isIncludeSection = ({ station }) => {
    const sections = this.getSection();
    function findStation(section) {
      return section.includes(station);
    }
    return sections.some(findStation);
  }

  isDuplicateStation = ({ station }) => {
    return this._stations.has(station);
  }

  isDuplicateLine = ({ lineName }) => {
    const lineNames = this.getLineNames();
    return lineNames.includes(lineName);
  }

  isLessThenTwoStation = ({ lineName }) => {
    const section = this._lines.get(lineName);
    return section.length <= 2;
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
    if (this.isIncludeSection({ station })) {
      return alert(`${station}은 노선에 포함되어 있습니다.`);
    }
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
    if (section.includes(station)) {
      return alert('이미 등록된 역입니다.');
    }
    if (order <= 0 || order >= section.length) {
      return alert('상행 종점역과 하행 종점역 사이의 순서를 입력해주세요.');
    }
    section.splice(order, 0, station);
  }

  deleteSection = ({ lineName, station }) => {
    if (this.isLessThenTwoStation({ lineName })) {
      return alert('노선에 포함된 역이 두개 이하일 때는 노선에서 역을 제거할 수 없습니다.');
    }
    const section = this._lines.get(lineName);
    const index = section.indexOf(station);
    section.splice(index, 1);
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

  getSection = () => {
    return [...this._lines.values()];
  }
}

import {
  Errors,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from './constants/Constants.js';

export default class Subway {
  constructor({ state }) {
    this.state = state;
    this.stations = state.stations;
    this.lines = state.lines;
  }

  isIncludeSection = ({ station }) => {
    const sections = this.getSection();
    function findStation(section) {
      return section.includes(station);
    }
    return sections.some(findStation);
  }

  isDuplicateStation = ({ station }) => {
    return this.stations.has(station);
  }

  isDuplicateLine = ({ lineName }) => {
    const lineNames = this.getLineNames();
    return lineNames.includes(lineName);
  }

  isLessThenTwoStation = ({ lineName }) => {
    const section = this.lines.get(lineName);
    return section.length <= MAX_NAME_LENGTH;
  }

  addStation = ({ station }) => {
    if (this.isDuplicateStation({ station })) {
      return alert(Errors['STATION_DUPLICATE_ERROR']);
    }
    if (station.length < MAX_NAME_LENGTH) {
      return alert(Errors['NAME_LESS_THEN_TWO_ERROR']);
    }
    this.stations.add(station);
  }

  deleteStation = ({ station }) => {
    if (this.isIncludeSection({ station })) {
      return alert(Errors['INCLUDE_SECTION_ERROR']);
    }
    this.stations.delete(station);
  }

  addLine = ({ lineName, start, end }) => {
    if (lineName === '') {
      return alert(Errors['EMPTY_LINE_ERROR']);
    }
    if (start === end) {
      return alert(Errors['SAME_STATION_ERROR']);
    }
    if (this.isDuplicateLine({ lineName })) {
      return alert(Errors['LINE_DUPLICATE_ERROR']);
    }
    const section = [start, end];
    this.lines.set(lineName, section);
  }

  deleteLine = ({ lineName }) => {
    this.lines.delete(lineName);
  }

  addSection = ({ lineName, order, station }) => {
    const section = this.lines.get(lineName);
    if (section.includes(station)) {
      return alert(Errors['STATION_DUPLICATE_ERROR']);
    }
    if (order <= MIN_NAME_LENGTH || order >= section.length) {
      return alert(Errors['SECTION_RANGE_ERROR']);
    }
    section.splice(order, 0, station);
  }

  deleteSection = ({ lineName, station }) => {
    if (this.isLessThenTwoStation({ lineName })) {
      return alert(Errors['STATION_DELETE_ERROR']);
    }
    const section = this.lines.get(lineName);
    const index = section.indexOf(station);
    section.splice(index, 1);
  }

  getStationName = () => {
    return [...this.stations];
  }

  getLines = () => {
    return [...this.lines.entries()].reduce((acc, line) => {
      const [lineName, section] = line;
      return [...acc, { lineName, section }];
    }, []);
  }

  getLineNames = () => {
    return [...this.lines.keys()];
  }

  getSection = () => {
    return [...this.lines.values()];
  }
}

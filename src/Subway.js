import {
  Errors,
  MAX_NAME_LENGTH,
} from './constants/ErrorConstants.js';

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

  isSectionRange = ({ section, order }) => {
    return order < 0 || order > section.length;
  }

  isOnlyKorean = (name) => {
    return /^[ㄱ-ㅎ|가-힣|0-9|\*]+$/.test(name);
  }

  isEmptyName = (name) => {
    return /\s+/.test(name);
  }

  isPossibleAddLine = ({ lineName, start, end }) => {
    if (this.isEmptyName(lineName)) {
      return alert(Errors['EMPTY_ERROR']);
    }
    if (!this.isOnlyKorean(lineName)) {
      return alert(Errors['ONLY_KOREAN_AND_NUMBER_ERROR']);
    }
    if (start === end) {
      return alert(Errors['SAME_STATION_ERROR']);
    }
    if (this.isDuplicateLine({ lineName })) {
      return alert(Errors['LINE_DUPLICATE_ERROR']);
    }
    if (this.isExistLastStopStation({ start, end })) {
      return alert(Errors['SAME_LAST_STOP_LINE_ERROR']);
    }
    return true;
  }

  isPossibleAddStation = ({ station }) => {
    if (this.isEmptyName(station)) {
      return alert(Errors['EMPTY_ERROR']);
    }
    if (!this.isOnlyKorean(station)) {
      return alert(Errors['ONLY_KOREAN_AND_NUMBER_ERROR']);
    }
    if (this.isDuplicateStation({ station })) {
      return alert(Errors['STATION_DUPLICATE_ERROR']);
    }
    if (station.length < MAX_NAME_LENGTH) {
      return alert(Errors['NAME_LESS_THEN_TWO_ERROR']);
    }
    return true;
  }

  isPossibleAddSection = ({ section, order, station }) => {
    if (section.includes(station)) {
      return alert(Errors['STATION_DUPLICATE_ERROR']);
    }
    if (this.isSectionRange({ section, order })) {
      return alert(Errors['SECTION_RANGE_ERROR']);
    }
    return true;
  }

  isExistLastStopStation = ({ start, end }) => {
    const lines = this.getLines();
    function findSameLastStop({ section }) {
      const startStation = section[0];
      const endStation = section[section.length - 1];
      return start === startStation && end == endStation;
    }
    return lines.some(findSameLastStop);
  }

  addStation = ({ station }) => {
    if (this.isPossibleAddStation({ station })) {
      this.stations.add(station);
    }
  }

  deleteStation = ({ station }) => {
    if (this.isIncludeSection({ station })) {
      return alert(Errors['INCLUDE_SECTION_ERROR']);
    }
    this.stations.delete(station);
  }

  addLine = ({ lineName, start, end }) => {
    if (this.isPossibleAddLine({ lineName, start, end })) {
      const section = [start, end];
      this.lines.set(lineName, section);
    }
  }

  deleteLine = ({ lineName }) => {
    this.lines.delete(lineName);
  }

  addSection = ({ lineName, order, station }) => {
    const section = this.lines.get(lineName);
    if (this.isPossibleAddSection({ section, order, station })) {
      section.splice(order, 0, station);
    }
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

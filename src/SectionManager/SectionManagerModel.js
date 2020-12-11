export default class SectionManagerModel {
  static isValidNumber(line, number) {
    return (number !== '') && this.isValidRange(line, number) && this.isNumber(number);
  }

  static isValidRange(line, number) {
    const linesLength = JSON.parse(localStorage.getItem('Lines'))[line].length;
    return linesLength + 1 >= number && number >= 0;
  }

  static isNumber(number) {
    return !/[^0-9]/.test(`${number}`);
  }

  static isInLines(line, station) {
    const lines = JSON.parse(localStorage.getItem('Lines'))[line];
    return lines.indexOf(station) > -1;
  }

  static add(line, station, index) {
    const linesJson = JSON.parse(localStorage.getItem('Lines'));
    const lines = JSON.parse(localStorage.getItem('Lines'))[line];
    lines.splice(index, 0, station);
    linesJson[line] = lines;
    localStorage.setItem('Lines', JSON.stringify(linesJson));
  }

  static checkNumOfStations(line) {
    return JSON.parse(localStorage.getItem('Lines'))[line].length > 2;
  }

  static delete(line, station) {
    const linesJson = JSON.parse(localStorage.getItem('Lines'));
    const lines = JSON.parse(localStorage.getItem('Lines'))[line];
    lines.splice(lines.indexOf(station), 1);
    linesJson[line] = lines;
    localStorage.setItem('Lines', JSON.stringify(linesJson));
  }
}

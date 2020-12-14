export default class SectionManagerModel {
  static isValidNumber(line, number) {
    return (number !== '') && this.isValidRange(line, number) && this.isNumber(number);
  }

  static isValidRange(line, number) {
    const linesLength = JSON.parse(localStorage.getItem('Lines'))[line].stations.length;
    return linesLength + 1 >= number && number >= 0;
  }

  static isNumber(number) {
    return !/[^0-9]/.test(`${number}`);
  }

  static isInLines(line, station) {
    const stations = JSON.parse(localStorage.getItem('Lines'))[line].stations;
    return stations.indexOf(station) > -1;
  }

  static add(line, station, index) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = JSON.parse(localStorage.getItem('Lines'))[line].stations;
    const stationJSON = JSON.parse(localStorage.getItem('Stations'));
    if (stationJSON[station].lines.indexOf(line) < 0) {
      stationJSON[station].lines.push(line);
    }
    stations.splice(index, 0, station);
    lines[line].stations = stations;
    localStorage.setItem('Stations', JSON.stringify(stationJSON));
    localStorage.setItem('Lines', JSON.stringify(lines));
  }

  static checkNumOfStations(line) {
    return JSON.parse(localStorage.getItem('Lines'))[line].stations.length > 2;
  }

  static delete(line, station) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = JSON.parse(localStorage.getItem('Lines'))[line].stations;
    stations.splice(stations.indexOf(station), 1);
    lines[line].stations = stations;
    localStorage.setItem('Lines', JSON.stringify(lines));
  }
}

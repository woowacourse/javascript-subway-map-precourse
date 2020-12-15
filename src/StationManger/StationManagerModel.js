export default class StationManagerModel {
  /*
   * INPUT CHECK
   */

  static isValidInput(station) {
    let isValid = 1;
    const validationCheckFunction = [
      this.isValidLength(station),
      this.isSpace(station),
      this.iskoreanCharacterError(station),
      this.isAlpha(station),
      this.isSpecialChar(station),
      this.isDuplicated(station),
      this.isOnlyNumber(station),
    ];
    validationCheckFunction.forEach((func, index) => {
      if (func && isValid === 1) {
        isValid = (-1) * index;
      }
    });
    return isValid;
  }

  static isValidLength(station) {
    return station.length < 2;
  }

  static isSpace(station) {
    return station.indexOf(' ') > -1;
  }

  static iskoreanCharacterError(station) {
    return /[^가-힣a-x0-9]/.test(station);
  }

  static isAlpha(station) {
    return /[a-z]/.test(station);
  }

  static isSpecialChar(station) {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(station);
  }

  static isDuplicated(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    return Object.keys(stations).indexOf(station) > -1;
  }

  static isOnlyNumber(station) {
    return !(/[^0-9]/.test(station));
  }

  /*
   * Add
   */

  static add(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    stations[station] = { "lines": [] };
    localStorage.setItem('Stations', JSON.stringify(stations));
  }

  /*
   * DELETE
   */

  static delete(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const linesIncludingStation = stations[station].lines;

    linesIncludingStation.forEach((line) => {
      lines[line].stations.splice(lines[line].stations.indexOf(station), 1);
    });
    delete stations[station];

    localStorage.setItem('Lines', JSON.stringify(lines));
    localStorage.setItem('Stations', JSON.stringify(stations));
  }

  static checkAfterDelete(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const linesIncludingStation = stations[station].lines;

    let isValid = 1;
    linesIncludingStation.forEach((line) => {
      if (lines[line].stations.length <= 2) {
        isValid = -7;
      }
    });
    return isValid;
  }
}

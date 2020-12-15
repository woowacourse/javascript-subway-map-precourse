export default class StationManagerModel {
  static add(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    stations[station] = { "lines": [] };
    localStorage.setItem('Stations', JSON.stringify(stations));
    console.log(JSON.parse(localStorage.getItem('Stations')));
  }

  static isValidName(station) {
    let isValid = 1;
    const validationCheckFunction = [
      this.isValidLength(station),
      this.isSpace(station),
      this.isSingleKoreanAlphabet(station),
      this.isEnglish(station),
      this.isSpecialChar(station),
      this.isDuplicated(station),
      this.isOnlyNumber(station),
    ];
    validationCheckFunction.forEach((func, index) => {
      if (func) {
        isValid = (-1) * index;
      }
    });
    return isValid;
  }

  static isDuplicated(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    return Object.keys(stations).indexOf(station) > -1;
  }

  static isSpace(station) {
    return station.indexOf(' ') > -1;
  }

  static isEnglish(station) {
    return /[a-z]/.test(station);
  }

  static isSpecialChar(station) {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(station);
  }

  static isValidLength(station) {
    return station.length < 2;
  }

  static isSingleKoreanAlphabet(station) {
    return /[^가-힣a-x0-9]/.test(station);
  }

  static isOnlyNumber(station) {
    return /[^0-9]/.test(station); // 숫자를 제외한 문자열이 있는 경우 true
  }

  static delete(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const linesOfStation = stations[station].lines;
    linesOfStation.forEach((line) => {
      lines[line].stations.splice(lines[line].stations.indexOf(station), 1);
    });
    delete stations[station];
    localStorage.setItem('Lines', JSON.stringify(lines));
    localStorage.setItem('Stations', JSON.stringify(stations));
  }

  static checkAfterDelete(station) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const linesOfStation = JSON.parse(localStorage.getItem('Stations'))[station].lines;
    let isValid = 1;
    linesOfStation.forEach((line) => {
      if (lines[line].stations.length <= 2) {
        isValid = -7;
      }
    });
    return isValid;
  }
}

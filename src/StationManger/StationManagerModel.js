export default class StationManagerModel {
  static add(station) {
    const stations = JSON.parse(localStorage.getItem('Stations'));
    stations[station] = { "lines": [] };
    localStorage.setItem('Stations', JSON.stringify(stations));
    console.log(JSON.parse(localStorage.getItem('Stations')));
  }

  static isValidName(station) {
    return (!this.isDuplicated(station) && !this.isSpace(station) && !this.isEnglish(station)
              && !this.isSpecialChar(station) && !this.isValidLength(station)
                && !this.isSingleKoreanAlphabet(station));
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
    return /[^가-힣]/.test(station);
  }

  static delete(station) {
    if (this.isDuplicated(station) && this.checkAfterDelete(station)) {
      const stations = JSON.parse(localStorage.getItem('Stations'));
      const lines = JSON.parse(localStorage.getItem('Lines'));
      const linesOfStation = stations[station].lines;
      linesOfStation.forEach((line) => {
        lines[line].stations.splice(lines[line].stations.indexOf(station), 1);
      });
      delete stations[station];
      localStorage.setItem('Lines', JSON.stringify(lines));
      localStorage.setItem('Stations', JSON.stringify(stations));
    } else {
      // error
      return 0;
    }
  }

  static checkAfterDelete(station) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const linesOfStation = JSON.parse(localStorage.getItem('Stations'))[station].lines;
    let isValid = true;
    linesOfStation.forEach((line) => {
      if (lines[line].stations.length <= 2) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }
}

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
    if (this.isDuplicated(station)) {
      const stations = JSON.parse(localStorage.getItem('Stations'));
      delete stations[station];
      localStorage.setItem('Stations', JSON.stringify(stations));
      console.log(JSON.parse(localStorage.getItem('Stations')));
    }
  }
}

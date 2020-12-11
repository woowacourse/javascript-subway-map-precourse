export default class StationManagerModel {
  static add(station) {
    const stations = localStorage.getItem('Stations').split(',');
    stations.push(station);
    localStorage.setItem('Stations', stations);
  }

  static isValidName(station) {
    return (!this.isDuplicated(station) && !this.isSpace(station) && !this.isEnglish(station)
              && !this.isSpecialChar(station) && !this.isValidLength(station)
                && !this.isSingleKoreanAlphabet(station));
  }

  static isDuplicated(station) {
    const stations = localStorage.getItem('Stations').split(',');
    return stations.indexOf(station) > -1;
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
}

export default class LineManagerModel {
  static isValidName(line) {
    return (!this.isDuplicated(line) && !this.isSpace(line) && !this.isEnglish(line)
              && !this.isSpecialChar(line) && !this.isValidLength(line)
                && !this.isSingleKoreanAlphabet(line));
  }

  static isDuplicated(line) {
    const lines = Object.keys(JSON.parse(localStorage.getItem('Lines')));
    return lines.indexOf(line) > -1;
  }

  static isSpace(line) {
    return line.indexOf(' ') > -1;
  }

  static isEnglish(line) {
    return /[a-z]/.test(line);
  }

  static isSpecialChar(line) {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(line);
  }

  static isValidLength(line) {
    return line.length < 2;
  }

  static isSingleKoreanAlphabet(line) {
    return /[^가-힣a-z0-9]/.test(line);
  }

  static isSame(lineStart, lineEnd) {
    return lineStart === lineEnd;
  }

  static add(line, lineStart, lineEnd) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = JSON.parse(localStorage.getItem('Stations'));

    lines[line] = { "stations": [lineStart, lineEnd] };
    if (stations[lineStart].lines.indexOf(line) < 0) {
      stations[lineStart].lines.push(line);
    }
    if (stations[lineStart].lines.indexOf(line) < 0) {
      stations[lineEnd].lines.push(line);
    }
    localStorage.setItem('Lines', JSON.stringify(lines));
    localStorage.setItem('Stations', JSON.stringify(stations));
    console.log(JSON.parse(localStorage.getItem('Lines')));
    console.log(JSON.parse(localStorage.getItem('Stations')));
  }

  static isInLines(line) {
    const lines = Object.keys(JSON.parse(localStorage.getItem('Lines')));
    return lines.indexOf(line) > -1;
  }

  static delete(line) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    delete lines[line];
    localStorage.setItem('Lines', JSON.stringify(lines));
  }
}
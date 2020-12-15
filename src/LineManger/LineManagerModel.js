export default class LineManagerModel {
  /*
   * INPUT CHECK
   */
  static isValidInput(line, lineStart, lineEnd) {
    let isValid = 1;
    const validationCheckFunction = [
      this.isValidLength(line),
      this.isSpace(line),
      this.iskoreanCharacterError(line),
      this.isAlpha(line),
      this.isSpecialChar(line),
      this.isDuplicated(line),
      this.isOnlyNumber(line),
      this.isSame(lineStart, lineEnd),
    ];
    validationCheckFunction.forEach((func, index) => {
      if (func && isValid === 1) {
        isValid = (-1) * index;
      }
    });
    return isValid;
  }

  static isValidLength(line) {
    return line.length < 2;
  }

  static isSpace(line) {
    return line.indexOf(' ') > -1;
  }

  static iskoreanCharacterError(line) {
    return /[^가-힣a-z0-9]/.test(line);
  }

  static isAlpha(line) {
    return /[a-z]/.test(line);
  }

  static isSpecialChar(line) {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(line);
  }

  static isDuplicated(line) {
    const lines = Object.keys(JSON.parse(localStorage.getItem('Lines')));
    return lines.indexOf(line) > -1;
  }

  static isOnlyNumber(line) {
    return !(/[^0-9]/.test(line));
  }

  static isSame(lineStart, lineEnd) {
    return lineStart === lineEnd;
  }

  /*
   * Add
   */
  static add(line, lineStart, lineEnd) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = JSON.parse(localStorage.getItem('Stations'));

    lines[line] = { "stations": [lineStart, lineEnd] };
    if (stations[lineStart].lines.indexOf(line) < 0) {
      stations[lineStart].lines.push(line);
    }
    if (stations[lineEnd].lines.indexOf(line) < 0) {
      stations[lineEnd].lines.push(line);
    }

    localStorage.setItem('Lines', JSON.stringify(lines));
    localStorage.setItem('Stations', JSON.stringify(stations));
  }

  /*
   * DELETE
   */
  static delete(line) {
    const lines = JSON.parse(localStorage.getItem('Lines'));
    const stations = JSON.parse(localStorage.getItem('Stations'));
    const stationsIncludedByLine = lines[line].stations;

    stationsIncludedByLine.forEach((station) => {
      stations[station].lines.splice(stations[station].lines.indexOf(line), 1);
    });
    delete lines[line];

    localStorage.setItem('Stations', JSON.stringify(stations));
    localStorage.setItem('Lines', JSON.stringify(lines));
  }
}

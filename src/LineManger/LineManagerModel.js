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
    lines[line] = [lineStart, lineEnd];
  }
}
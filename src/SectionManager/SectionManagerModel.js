export default class SectionManagerModel {
  static isValidNumber(number) {
    return (number !== '') && this.isValidRange(number) && this.isNumber(number);
  }

  static isValidRange(number) {
    const linesLength = Object.keys(JSON.parse(localStorage.getItem('Lines'))).length;
    return linesLength + 1 >= number && number >= 0;
  }

  static isNumber(number) {
    return !/[^0-9]/.test(`${number}`);
  }
}

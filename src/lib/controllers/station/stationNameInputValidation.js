export default class StationNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this.isLessThanTwoCharacters = inputValue.length < 2;
  }

  // 2. 중복된 지하철 역 이름은 등록될 수 없다.

  // 3. 체크 결과 리턴하기.
}

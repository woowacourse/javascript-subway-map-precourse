export default class SectionErrorMsg {
  static error(number) {
    const errorMsg = [
      this.lengthError(),
      this.duplicateError(),
      this.stationNumberError(),
      this.cancelDeleteError(),
    ];
    return errorMsg[number * (-1)];
  }

  /*
   * INPUT ERROR
   */

  static lengthError() {
    return '순서는 0 이상의 정수만 입력할 수 있습니다.\n최대 입력 순서 번호는 마지막 순서 번호 + 1 입니다.\n';
  }

  static duplicateError() {
    return '이미 해당 역이 노선에 존재합니다.\n';
  }

  /*
   * DELETE ERROR
   */

  static stationNumberError() {
    return '포함된 노선이 2개 이하로 역 삭제가 불가능 합니다.';
  }

  static cancelDeleteError() {
    return '삭제를 취소했습니다.';
  }
}

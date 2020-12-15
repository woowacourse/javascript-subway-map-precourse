export default class LineErrorMsg {
  static error(number) {
    const errorMsg = [
      this.lengthError(),
      this.spaceError(),
      this.koranCharacterError(),
      this.notKoreanError(),
      this.specialCharError(),
      this.duplicateError(),
      this.onlyNumberError(),
      this.sameStartEndError(),
      this.cancelDeleteError(),
    ];
    return errorMsg[number * (-1)];
  }

  /*
   * INPUT ERROR
   */

  static lengthError() {
    return '노선 이름은 2글자 이상으로 작성해 주세요.\n';
  }

  static spaceError() {
    return '노선 이름 사이에는 공백이 들어갈 수 없습니다.\n';
  }

  static koranCharacterError() {
    return '완전한 한글 단어로 입력해 주세요.\nex. ㅏ역 (x) 다역 (o)\n';
  }

  static notKoreanError() {
    return '노선 이름은 한글로만 작성할 수 있습니다.\n';
  }

  static specialCharError() {
    return '노선 이름에는 특수 문자가 들어 갈 수 없습니다.\n';
  }

  static duplicateError() {
    return '이미 해당 이름의 노선이 존재합니다.\n';
  }

  static onlyNumberError() {
    return '노선 이름은 숫자로만 이루어 질 수 없습니다.\n';
  }

  static sameStartEndError() {
    return '상행선 종점과 하행선 종점은 같을 수 없습니다.\n';
  }

  /*
   * DELETE ERROR
   */

  static cancelDeleteError() {
    return '삭제를 취소했습니다.';
  }
}

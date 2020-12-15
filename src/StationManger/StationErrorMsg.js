export default class StationErrorMsg {
  static error(number) {
    const errorMsg = [
      this.lengthError(),
      this.spaceError(),
      this.characterError(),
      this.languageError(),
      this.specialCharError(),
      this.duplicateError(),
      this.onlyNumberError(),
      this.stationNumberError(),
      this.cancelDeleteError(),
    ];
    return errorMsg[number * (-1)];
  }

  /*
   * INPUT ERROR
  */
  static lengthError() {
    return '역 이름은 2글자 이상으로 작성해 주세요.\n';
  }

  static spaceError() {
    return '역 이름 사이에는 공백이 들어갈 수 없습니다.\n';
  }

  static characterError() {
    return '완전한 한글 단어로 입력해 주세요.\nex. ㅏ역 (x) 다역 (o)\n';
  }

  static languageError() {
    return '역 이름은 한글로만 작성할 수 있습니다.\n';
  }

  static specialCharError() {
    return '역 이름에는 특수 문자가 들어 갈 수 없습니다.\n';
  }

  static duplicateError() {
    return '이미 해당 이름의 역이 존재합니다.\n';
  }

  static onlyNumberError() {
    return '역 이름은 숫자로만 이루어 질 수 없습니다.\n';
  }

  /*
   * DELETE ERROR
   */

  static stationNumberError() {
    return '해당 역이 포함된 노선 중, 포함 된 역이 3개 미만인 역이 있어 삭제가 불가능 합니다.';
  }

  static cancelDeleteError() {
    return '삭제를 취소했습니다.';
  }
}

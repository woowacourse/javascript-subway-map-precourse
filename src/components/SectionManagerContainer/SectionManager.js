import SectionManagerEvent from "./SectionManagerEvent.js";

export default class SectionManager extends SectionManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManager--");
  }

  isVaildOrderNumber(order, lineIndex) {
    super.isVaildOrderNumber(order, lineIndex);

    if (
      this.isMaxOrder(order, lineIndex) &&
      this.isMinOrder(order) &&
      this.isEmpty(order)
    ) {
      return true;
    }

    return false;
  }

  isMaxOrder(order, lineIndex) {
    const maxOrder = this.lines[lineIndex].line.length;

    if (maxOrder >= order) {
      return true;
    }

    window.alert(`0부터 ${maxOrder}까지의 순서만 입력 가능합니다.`);
    return false;
  }

  isMinOrder(order) {
    if (order > 0) {
      return true;
    }

    window.alert("0 이상의 순서를 입력해주세요");
    return false;
  }

  isEmpty(order) {
    if (order !== "") {
      return true;
    }

    window.alert("값을 입력해 주세요");
    return false;
  }
}

import LineManagerEvent from "./LineManagerEvent.js";

export default class LineManager extends LineManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManager--");
  }

  isValidLineInfo(lineInfo) {
    super.isValidLineInfo(lineInfo);
    if (
      this.isDuplicateLineName(lineInfo.lineName) &&
      this.isStationDigit() &&
      this.isStartEndSame(lineInfo.line[0], lineInfo.line[1])
    ) {
      return true;
    }
    return false;
  }

  isDuplicateLineName(inputLineName) {
    for (const line of this.lines) {
      if (line.lineName === inputLineName) {
        window.alert("같은 노선이 있습니다. 다시 입력해 주세요");
        return false;
      }
    }
    return true;
  }

  isStationDigit() {
    if (this.stations.length >= 2) return true;
    window.alert("역의 개수는 2개 이상이여야 합니다. 역을 추가해주세요");
    return false;
  }

  isStartEndSame(start, end) {
    if (start !== end) return true;
    window.alert(
      "상행 종점과 하행 종점이 같습니다. 서로 다른 종점을 선택해 주세요"
    );
    return false;
  }
}

import { getLocalStorageDataBy } from "./local_storage.js";

const State = function () {
  this.state = {
    stations: getLocalStorageDataBy("stations") || "[]",
    lines: getLocalStorageDataBy("lines") || "[]",
    currentPage: "0",
    selectedLineIndex: null,
    alreadySelectionButtonClicked: false,
  };
  // currentPage "0": 초기 상태, "1": 역 관리, "2": 노선 관리, "3": 구간 관리, "4": 지하철 노선도 관리
  this.setState = (dataName, nextState) => (this.state[dataName] = nextState);

  this.resultDIV = document.getElementById("result");
  this.VALUE_IN_ARRAY = "valueInArray";
  this.INDEX_OF_DATA = "indexOfData";
};

export const { VALUE_IN_ARRAY, INDEX_OF_DATA, setState } = new State();

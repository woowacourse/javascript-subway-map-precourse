import { getLocalStorageDataBy } from "./local_storage.js";

const State = function () {
  // 스토리지에서 state로 데이터 가져옴 -> 값 필요할 때

  this.state = {
    stations: getLocalStorageDataBy("stations"),
    lines: getLocalStorageDataBy("lines"),
    currentPage: "0",
  }; // "0": 초기 상태, "1": 역 관리, "2": 노선 관리, "3": 구간 관리, "4": 지하철 노선도 관리

  this.isEmptyPage = () => this.state.currentPage === "0";
  this.isAlreadyRenderedPage = (page) => this.state.currentPage === page;

  this.setState = (dataName, nextState) => {
    this.state[dataName] = nextState;
  };

  this.resultDIV = document.getElementById("result");
  this.clearResultDIV = () => {
    resultDIV.innerHTML = "";
  };
};

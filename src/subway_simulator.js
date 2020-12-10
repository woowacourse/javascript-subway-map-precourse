import { getLocalStorageData } from "./utils.js";
const SubwaySimulator = function () {
  const [stations, lines] = getLocalStorageData();
  this.stations = stations;
  this.lines = lines;

  this.currentPage = "0"; // "1": 역 관리, "2": "노선 관리", "3": 구간 관리, "4": 지하철 노선도 관리
  this.isAlreadyRenderedPage = (page) => this.currentPage === page;
};

export const { isAlreadyRenderedPage } = new SubwaySimulator();

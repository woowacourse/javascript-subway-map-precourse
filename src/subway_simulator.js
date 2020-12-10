import { getLocalStorageData } from "./utils.js";
const SubwaySimulator = function () {
  const [stations, lines] = getLocalStorageData();
  this.stations = stations;
  this.lines = lines;
};

export const {} = new SubwaySimulator();

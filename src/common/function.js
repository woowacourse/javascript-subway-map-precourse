import { setLocalStorageDataOf } from "../local_storage.js";
import { resultDIV, setState, state } from "../state.js";

const Function = function () {
  this.setStateAndLocalStorage = (stationsOrLines, data) => {
    const stringData = JSON.stringify(data);
    setState(stationsOrLines, stringData);
    setLocalStorageDataOf(stationsOrLines, stringData);
  };

  this.isEmptyPage = () => state.currentPage === "0";
  this.isAlreadyRenderedPage = (page) => state.currentPage === page;

  this.getFormattedStations = () => JSON.parse(state.stations);
  this.getFormattedLines = () => JSON.parse(state.lines);

  this.clearResultDIV = () => (resultDIV.innerHTML = "");

  this.isBiggerThanTwo = (target) => target > 2;
};

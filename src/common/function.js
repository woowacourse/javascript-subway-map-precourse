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

  this.getSelectedLineSections = () =>
    this.getFormattedLines()[state.selectedLineIndex].sections;

  this.clearResultDIV = () => (resultDIV.innerHTML = "");

  this.isLineNameLengthBiggerThanOneWithoutSpace = (lineName) =>
    lineName.split("").filter((char) => char !== " ").length > 1;

  this.isBiggerThanTwo = (target) => target > 2;
};

export const {
  getFormattedStations,
  getFormattedLines,
  isLineNameLengthBiggerThanOneWithoutSpace,
  setStateAndLocalStorage,
  clearResultDIV,
  getSelectedLineSections,
} = new Function();

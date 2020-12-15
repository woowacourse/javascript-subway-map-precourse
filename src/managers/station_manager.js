import {
  getFormattedLines,
  getFormattedStations,
  setStateAndLocalStorage,
} from "../common/function";

const StationManager = function () {
  this.isContainedInLengthTwoSections = (stationName) => {
    let result = false;
    getFormattedLines().forEach((line) => {
      if (
        line.sections.length === 2 &&
        line.sections.indexOf(stationName) !== -1
      )
        result = true;
    });
    return result;
  };

  this.getFilteredLines = (station) =>
    getFormattedLines().map((line) => {
      line.sections = line.sections.filter((sections) => sections !== station);
      return line;
    });

  this.removeStationFromStateAndStorage = (stationName) => {
    const nextStations = getFormattedStations().filter(
      (station) => station !== stationName
    );
    const nextLines = this.getFilteredLines(stationName);
    setStateAndLocalStorage("stations", nextStations);
    setStateAndLocalStorage("lines", nextLines);
  };
};

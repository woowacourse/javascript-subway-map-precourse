import {
  getFormattedLines,
  getFormattedStations,
  setStateAndLocalStorage,
} from "../common/function";
import { removeTr } from "../creators/station_creator";

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

  this.deleteButtonClickFunction = ({ target: targetButton }) => {
    const { stationName } = targetButton.dataset;
    if (this.isContainedInLengthTwoSections(stationName)) {
      alert("That station is contained in the line which has two sections.");
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    this.removeStationFromStateAndStorage(stationName);
    removeTr(targetButton);
  };

  this.setStationDeleteButtonClickListener = () => {
    const buttons = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.deleteButtonClickFunction);
    }
  };
};

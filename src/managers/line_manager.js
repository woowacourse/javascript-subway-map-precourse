import {
  getFormattedLines,
  isLineNameLengthBiggerThanOneWithoutSpace,
  setStateAndLocalStorage,
} from "../common/function";
import { removeTr } from "../containers/line_container";

const LineManager = function () {
  this.getSelectors = () => [
    document.getElementById("line-start-station-selector"),
    document.getElementById("line-end-station-selector"),
  ];

  this.isOverwritten = (inputValue) =>
    getFormattedLines().reduce(
      (result, line) => result || line.name === inputValue,
      false
    );

  this.checkLineValidity = (lineName, startSelector, endSelector) => {
    const SMALL_THAN_TWO = "Line name should be bigger than two.";
    const STATION_IS_SAME =
      "The selected start station is same with the end one.";
    const OVERWRITEEN = "It's overwritten.";
    if (!isLineNameLengthBiggerThanOneWithoutSpace(lineName))
      return { value: false, errorMessage: SMALL_THAN_TWO };
    if (startSelector.value === endSelector.value)
      return { value: false, errorMessage: STATION_IS_SAME };
    if (this.isOverwritten(lineName))
      return { value: false, errorMessage: OVERWRITEEN };
    return { value: true };
  };

  this.deleteButtonClickFunction = ({ target }) => {
    const { lineName } = target.dataset;
    const lines = getFormattedLines();
    const lineIndex = lines.findIndex((line) => line.name === lineName);
    if (!confirm("Are you sure?")) return;
    lines.splice(lineIndex, 1);
    setStateAndLocalStorage("lines", lines);
    removeTr(target);
  };
};

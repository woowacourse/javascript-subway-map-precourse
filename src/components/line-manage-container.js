import SubwayLine from "../domain/subway-line.js";
import inputLineValidator from "../utils/inputs/validator/line-name-validator.js";
import clearInput from "../utils/inputs/clear-input.js";
import { saveToLocalStorage } from "../index.js";
import { showNewRow, makeSelectOptions } from "../utils/display/make-elements.js";
import { getStationByName } from "../utils/global-utils.js";
import { LINE_ALERT_MESSAGES } from "../global/messages.js";
import { LINE_ARRAY_KEY, LINE_TAGS } from "../global/constant.js";

const SUBWAY_LINE_TBODY_ID = "lines";

function loadLines(state) {
  for (const line of state.subwayLines) {
    showNewRow(SUBWAY_LINE_TBODY_ID, line, [
      line.lineName,
      line.stations[0].stationName,
      line.stations[line.stations.length - 1].stationName
    ]);
  }
}

function validateLineName(subwayLines, lineName, upLine, downLine, addLineInput) {
  if (inputLineValidator(lineName)) {
    saveLine(subwayLines, lineName, upLine, downLine);
    saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(subwayLines));
    clearInput(addLineInput);
  } else {
    clearInput(addLineInput);
  }
}

function saveLine(subwayLines, lineName, upLine, downLine) {
  let lineId = 0;
  if (subwayLines.length !== 0) {
    lineId = subwayLines[subwayLines.length - 1].id + 1;
  }

  const line = new SubwayLine(
    lineName,
    getStationByName(upLine.value),
    getStationByName(downLine.value),
    lineId
  );

  showNewRow(SUBWAY_LINE_TBODY_ID, line, [
    line.lineName,
    line.stations[0].stationName,
    line.stations[line.stations.length - 1].stationName
  ]);

  subwayLines.push(line);
}

export default function lineManageContainer(state) {
  const addLineInput = document.getElementById(LINE_TAGS.LINE_NAME_INPUT_ID);
  const addLineSubmit = document.getElementById(LINE_TAGS.ADD_LINE_ID);
  const upLine = document.getElementById(LINE_TAGS.SELECT_UP_LINE_ID);
  const downLine = document.getElementById(LINE_TAGS.SELECT_DOWN_LINE_ID);
  makeSelectOptions(upLine, state.stationArray);
  makeSelectOptions(downLine, state.stationArray);
  loadLines(state);

  addLineSubmit.addEventListener("click", () => {
    if (upLine.value !== downLine.value) {
      const lineNameInputValue = addLineInput.value.trim();
      validateLineName(state.subwayLines, lineNameInputValue, upLine, downLine, addLineInput);
    } else {
      alert(LINE_ALERT_MESSAGES.ERROR_UPLINE_DOWNLINE_SAME);
    }
  });
}

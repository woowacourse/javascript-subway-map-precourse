import SubwayLine from "../domain/subway-line.js";
import { makeSelectOptions } from "../utils/display/make-elements.js";
import { showNewRow } from "../components/station-manage-container.js";
import { saveToLocalStorage } from "../index.js";
import clearInput from "../utils/inputs/clear-input.js";
import { LINE_ARRAY_KEY } from "../global/constant.js";
import { getStationByName } from "../utils/global-utils.js";

const SUBWAY_LINE_TBODY_ID = "lines";

function loadLines(state) {
  console.log(state.subwayLines, "서브웨이");
  for (const line of state.subwayLines) {
    showNewRow(SUBWAY_LINE_TBODY_ID, line, [
      line.lineName,
      line.stations[0].stationName,
      line.stations[1].stationName,
    ]);
  }
}

export default function lineManageContainer(state) {
  const addLineInput = document.getElementById("line-name-input");
  const selectUpLine = document.getElementById("line-start-station-selector");
  const selectDownLine = document.getElementById("line-end-station-selector");
  const addLineSubmit = document.getElementById("line-add-button");

  makeSelectOptions(selectUpLine, state.stationArray);
  makeSelectOptions(selectDownLine, state.stationArray);
  loadLines(state);

  addLineSubmit.addEventListener("click", () => {
    const lineNameInputValue = addLineInput.value;

    let lineId = 0;

    if (state.subwayLines.length === 0) {
      lineId = 0;
    } else {
      lineId = state.subwayLines[state.subwayLines.length - 1].id + 1;
    }

    const line = new SubwayLine(
      lineNameInputValue,
      getStationByName(selectUpLine.value),
      getStationByName(selectDownLine.value),
      lineId
    );

    showNewRow(SUBWAY_LINE_TBODY_ID, line, [
      line.lineName,
      line.stations[0].stationName,
      line.stations[1].stationName,
    ]);

    state.subwayLines.push(line);
    saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
    clearInput(addLineInput);
  });
}

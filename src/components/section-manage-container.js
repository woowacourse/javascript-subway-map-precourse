import { makeSelectOptions } from "../utils/display/make-elements.js";

export default function sectionManageContainer(state) {
  const addLineInput = document.getElementById("line-name-input");
  const selectUpLine = document.getElementById("line-start-station-selector");
  const selectDownLine = document.getElementById("line-end-station-selector");

  makeSelectOptions(selectUpLine, state.stationArray);
  makeSelectOptions(selectDownLine, state.stationArray);

  addLineInput.addEventListener("click", () => {
    const lineNameInputValue = addLineInput.value;
  });
}

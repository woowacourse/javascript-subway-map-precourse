import { isValidLineInfo } from "../utils";
import { INVALID_LINE_INFO } from "./lineConstant";

export default function lineContainer() {
  let lineList = [];

  const checkLineName = lineName => {
    const lineInfo = [lineName, startLine, endLine];

    isValidLineInfo(lineList, lineInfo)
      ? lineList.push(lineInfo)
      : alert(INVALID_LINE_INFO);
  };

  const setSelectorOption = selector => {
    const stationData = JSON.parse(window.localStorage.getItem("stationList"));
    if (stationData) {
      for (const station of stationData) {
        const selectorOption = document.createElement("option");
        selectorOption.textContent = station;
        selector.appendChild(selectorOption);
      }
    }
  };

  const init = () => {
    const lineNameContainer = document.querySelector("#line-manager-container");
    const lineNameInput = document.querySelector("#line-name-input");
    const lineStartSelector = document.querySelector(
      "#line-start-name-selector",
    );
    const lineEndSelector = document.querySelector("#line-start-end-selector");
    const lineNameButton = document.querySelector("#line-name-button");

    setSelectorOption(lineStartSelector);
    setSelectorOption(lineEndSelector);
    lineNameContainer.style.display = "block";
    lineNameButton.addEventListener("click", () => {
      checkLineName(
        lineNameInput.value,
        lineStartSelector.options[lineStartSelector.selectedIndex].value,
        lineEndSelector.options[lineEndSelector.selectedIndex].value,
      );
      lineNameInput.value = "";
    });
  };

  init();
}

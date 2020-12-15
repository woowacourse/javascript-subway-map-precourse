import { isValidLineInfo } from "../utils";
import { INVALID_LINE_INFO } from "./lineConstant";
import { lineListTemplate } from "./linePresenter";

export default function lineContainer() {
  let lineList = [];

  const checkLineName = (lineName, startLine, endLine) => {
    const lineInfo = [lineName, startLine, endLine];

    isValidLineInfo(lineList, lineInfo)
      ? addLine(lineInfo)
      : alert(INVALID_LINE_INFO);
  };

  const addLine = lineInfo => {
    lineList.push(lineInfo);
    setLocalData(lineList);
    lineListTemplate(lineList);
    removeLineHandler();
  };

  const removeLineHandler = () => {
    const lineRemoveButton = document.querySelectorAll("#line-remove-button");
    if (lineRemoveButton !== null) {
      for (const removeButton of lineRemoveButton) {
        removeButton.addEventListener("click", event => {
          removeLine(event);
        });
      }
    }
  };

  const removeLine = event => {
    const targetLine = event.target.parentNode.parentNode;
    const lineName = targetLine.dataset.linename;
    let lineIndex = 0;
    for (const line of lineList) {
      if (line[0] === lineName) {
        lineIndex = lineList.indexOf(line);
      }
    }
    lineList.splice(lineIndex, 1);
    setLocalData(lineList);
    lineListTemplate(lineList);
    removeLineHandler();
  };

  const setLocalData = lineList => {
    window.localStorage.setItem("lineList", JSON.stringify(lineList));
  };

  const getLocalData = () => {
    let localData = window.localStorage.getItem("lineList");

    if (localData) {
      lineList = JSON.parse(localData);
    }
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

    getLocalData();
    lineListTemplate(lineList);
    removeLineHandler();
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

import {
  getFormattedLines,
  getFormattedStations,
  getSelectedLineSections,
} from "../common/function.js";
import { appendChildren } from "../common/visualization.js";
import {
  createSectionTrs,
  createSpreadElements,
  createInitialTitle,
  createLineSelectionButtons,
} from "../creators/section_creator.js";
import { setState } from "../state.js";

const SectionContainer = function () {
  this.changeTableBody = () => {
    const tbody = document.getElementById("section-tbody");
    tbody.innerHTML = "";
    const sections = getSelectedLineSections();
    const innerContents = createSectionTrs(sections);
    appendChildren(tbody, ...innerContents);
  };

  this.changeManagementTitleText = (lineName) => {
    const TitleElement = document.getElementById("line-management-title");
    const newText = `${lineName} 관리`;
    TitleElement.textContent = newText;
  };

  this.rerenderOnlyChange = (lineName) => {
    this.changeManagementTitleText(lineName);
    this.changeTableBody();
  };

  this.appendSpreadElements = (parent, lineName) => {
    const {
      managemenetTitle,
      addTitle,
      addDiv,
      sectionTable,
    } = createSpreadElements(lineName);
    appendChildren(parent, managemenetTitle, addTitle, addDiv);
    parent.appendChild(sectionTable);
  };

  this.clearSectionInputs = (sectionInput, orderInput) => {
    sectionInput.value = getFormattedStations()[0];
    orderInput.value = "";
  };

  this.appendInitialElements = (parent, lineNames) => {
    const initialTitle = createInitialTitle();
    const lineSelectionButtons = createLineSelectionButtons(lineNames);
    appendChildren(parent, initialTitle, ...lineSelectionButtons);
  };

  this.renderSection = (parent) => {
    setState("selectedLineIndex", null);
    const lineNames = getFormattedLines().map((line) => line.name);
    this.appendInitialElements(parent, lineNames);
  };
};

export const { changeTableBody, clearSectionInputs } = new SectionContainer();

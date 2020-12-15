import { getSelectedLineSections } from "../common/function.js";
import { appendChildren } from "../common/visualization.js";
import {
  createSectionTrs,
  createSpreadElements,
} from "../creators/section_creator.js";

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
};

export const { changeTableBody } = new SectionContainer();

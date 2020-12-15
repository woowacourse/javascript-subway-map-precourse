import { getSelectedLineSections } from "../common/function.js";
import { appendChildren } from "../common/visualization.js";
import { createSectionTrs } from "../creators/section_creator.js";

const SectionContainer = function () {
  this.changeTableBody = () => {
    const tbody = document.getElementById("section-tbody");
    tbody.innerHTML = "";
    const sections = getSelectedLineSections();
    const innerContents = createSectionTrs(sections);
    appendChildren(tbody, ...innerContents);
  };
};

export const { changeTableBody } = new SectionContainer();

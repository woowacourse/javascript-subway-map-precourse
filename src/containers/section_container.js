import { getSelectedLineSections } from "../common/function";
import { appendChildren } from "../common/visualization";
import { createSectionTrs } from "../creators/section_creator";

const SectionContainer = () => {
  this.changeTableBody = () => {
    const tbody = document.getElementById("section-tbody");
    tbody.innerHTML = "";
    const sections = getSelectedLineSections();
    const innerContents = createSectionTrs(sections);
    appendChildren(tbody, ...innerContents);
  };
};

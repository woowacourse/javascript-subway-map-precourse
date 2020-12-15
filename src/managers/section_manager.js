import {
  getFormattedLines,
  isBiggerThanTwo,
  setStateAndLocalStorage,
} from "../common/function";
import { changeTableBody } from "../containers/section_container";

const SectionManager = function () {
  this.isExist = (sectionName, sections) =>
    sections.indexOf(sectionName) !== -1;

  this.isOrderCorrect = (order, sectionLength) =>
    order >= 0 && order <= sectionLength;

  this.onDeleteButtonClick = ({ target: { dataset } }) => {
    const { sectionName } = dataset;
    const lines = getFormattedLines();
    if (!isBiggerThanTwo(lines[state.selectedLineIndex].sections.length)) {
      alert(`You can't delete it because Sections are less than 2.`);
      return;
    }
    if (!confirm("정말로 노선에서 제거하겠습니까?")) return;
    lines[state.selectedLineIndex].sections = lines[
      state.selectedLineIndex
    ].sections.filter((section) => section !== sectionName);
    this.updateDataAndRerender(lines);
  };

  this.setDeleteButtonClickEvent = () => {
    const buttons = document.getElementsByClassName("section-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.onDeleteButtonClick);
    }
  };

  this.updateDataAndRerender = (updatedLines) => {
    setStateAndLocalStorage("lines", updatedLines);
    changeTableBody();
    this.setDeleteButtonClickEvent();
  };
};

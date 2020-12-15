import {
  getFormattedLines,
  getSelectedLineSections,
  isBiggerThanTwo,
  setStateAndLocalStorage,
} from "../common/function";
import {
  changeTableBody,
  clearSectionInputs,
} from "../containers/section_container";
import { state } from "../state";

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

  this.checkSectionValidity = (section, order) => {
    const sections = getSelectedLineSections();
    if (order === "")
      return {
        value: false,
        errorMessage: "Put something into input and try again.",
      };
    if (this.isExist(section, sections))
      return { value: false, errorMessage: "This section is already added." };
    if (!this.isOrderCorrect(parseInt(order, 10), sections.length))
      return { value: false, errorMessage: "Section order isn't correct." };
    return { value: true };
  };

  this.handleAddProcess = (sectionInput, orderInput) => {
    const formattedLines = getFormattedLines();
    formattedLines[state.selectedLineIndex].sections.splice(
      orderInput.value,
      0,
      sectionInput.value
    );
    this.updateDataAndRerender(formattedLines);
    clearSectionInputs(sectionInput, orderInput);
  };

  this.onAddButtonClick = () => {
    const sectionName = document.getElementById("section-selector");
    const orderInput = document.getElementById("section-order-input");
    const validity = this.checkSectionValidity(
      sectionName.value,
      orderInput.value
    );
    if (!validity.value) alert(validity.errorMessage);
    else this.handleAddProcess(sectionName, orderInput);
  };

  this.setSectionAddButtonClickEvent = () =>
    document
      .getElementById("section-add-button")
      .addEventListener("click", this.onAddButtonClick);
};

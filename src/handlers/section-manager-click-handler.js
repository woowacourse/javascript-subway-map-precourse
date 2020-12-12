import StationManager from "../station-manager.js";
import LineManager from "../line-manager.js";
import {
  SECTION_MANAGER_CONTAINERS_ID,
  SELECTORS_ID,
  TBODY_ID,
  ADD_BUTTONS_ID,
  INPUT_FORM_ID,
} from "../html-constants/html-id-values.js";
import {
  SECTION_LINE_MENU_BUTTON,
  DELETE_BUTTONS_CLASS,
} from "../html-constants/html-classnames.js";
import { getChildById } from "./custom-dom-handler.js";

const renderSelectedLineManagerHeader = ($selectedLineManager, lineIndex) => {
  const header = getChildById(
    $selectedLineManager,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManagerHeader
  );
  const lineName = new LineManager().lineList[lineIndex].name;
  header.innerHTML = `${lineName} 관리`;
};

const renderStationSelectorOptions = ($select, lineIndex) => {
  const stationList = new StationManager().stationList;
  const section = new LineManager().lineList[lineIndex].section;
  $select.innerHTML = "<option value=''>--선택--</option>";
  $select.innerHTML += stationList
    .map((_station) => {
      if (!section.find((_inSection) => _inSection === _station)) {
        return `<option value=${_station}>${_station}</option>`;
      }
    })
    .join("\n");
};

const addLineIndexAsDatasetToSectionAddButton = (
  $selectedLineManager,
  lineIndex
) => {
  getChildById(
    $selectedLineManager,
    ADD_BUTTONS_ID.sectionAddButton
  ).dataset.lineIndex = lineIndex;
};

const getSectionRow = (station, sectionIndex, lineIndex) => {
  return `
    <tr data-line-index=${lineIndex}>
      <td>${sectionIndex}</td>
      <td>${station}</td>
      <td><button 
        class=${DELETE_BUTTONS_CLASS.sectionDeleteButton}
        data-section-index=${sectionIndex}
        data-station-name=${station}
        >노선에서 제거</button>
    </tr>
  `;
};

const renderLineSectionTbody = (lineIndex) => {
  const currentLine = new LineManager().lineList[lineIndex];
  const $tbody = document.getElementById(TBODY_ID.lineSectionTbody);
  $tbody.innerHTML = currentLine.section
    .map((_station, _index) => {
      return getSectionRow(_station, _index, lineIndex);
    })
    .join("\n");
};

const showSelectedLineManager = ($selectedLineManager, lineIndex) => {
  $selectedLineManager.style.display = "block";
  renderSelectedLineManagerHeader($selectedLineManager, lineIndex);
  renderStationSelectorOptions(
    getChildById($selectedLineManager, SELECTORS_ID.sectionStationSelector),
    lineIndex
  );
  addLineIndexAsDatasetToSectionAddButton($selectedLineManager, lineIndex);
  renderLineSectionTbody(lineIndex);
};

const isSectionSelectorValid = ($selectedLineManager) => {
  const $select = getChildById(
    $selectedLineManager,
    SELECTORS_ID.sectionStationSelector
  );
  if ($select.value === "") {
    alert("구간으로 추가할 역을 선택해주세요.");
    return false;
  }
  return true;
};

const isSectionOrderInputEmpty = (input) => {
  if (input === "") {
    alert("순서(숫자)를 입력해주세요");
    return true;
  }
  return false;
};

const isInputInRange = (input, lineIndex) => {
  const numberOfSection = new LineManager().lineList[lineIndex].section.length;
  const inputAsNumber = input * 1;
  if (inputAsNumber < 0 || inputAsNumber > numberOfSection) {
    alert(`0이상 ${numberOfSection}이하의 수를 입력해주세요.`);
    return false;
  }
  return true;
};

const isInteger = (input) => {
  if (input * 1 !== parseInt(input)) {
    alert("0이상의 정수만 입력 가능합니다.");
    return false;
  }
  return true;
};

const isSectionOrderInputValid = ($selectedLineManager, lineIndex) => {
  const sectionOrderInputValue = getChildById(
    $selectedLineManager,
    INPUT_FORM_ID.sectionOrderInput
  ).value;

  return (
    !isSectionOrderInputEmpty(sectionOrderInputValue) &&
    isInputInRange(sectionOrderInputValue, lineIndex) &&
    isInteger(sectionOrderInputValue)
  );
};

const emptySectionOrderInputValue = ($selectedLineManager) => {
  // eslint-disable-next-line prettier/prettier
  getChildById(
    $selectedLineManager,
    INPUT_FORM_ID.sectionOrderInput
  ).value = "";
};

const addSectionToSelectedLine = ($selectedLineManager, lineIndex) => {
  const order =
    getChildById($selectedLineManager, INPUT_FORM_ID.sectionOrderInput).value *
    1;
  const station = getChildById(
    $selectedLineManager,
    SELECTORS_ID.sectionStationSelector
  ).value;
  new LineManager().addSection(lineIndex, order, station);
  emptySectionOrderInputValue($selectedLineManager);
};

const selectedLineManagerHandler = (e) => {
  const $selectedLineManager = getChildById(
    e.target.parentElement.parentElement,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManager
  );
  showSelectedLineManager(
    $selectedLineManager,
    e.target.dataset.selectedLineIndex
  );
};

const isNumberOfSectionTwoOrLess = (lineIndex) => {
  const numberOfSection = new LineManager().lineList[lineIndex].section.length;
  if (numberOfSection < 3) {
    alert("더 이상 구간을 제거할 수 없습니다.");
    return true;
  }
  return false;
};

const sectionAddButtonHandler = (e) => {
  const $selectedLineManager = e.target.parentElement;
  const lineIndex = e.target.dataset.lineIndex;
  if (
    isSectionSelectorValid($selectedLineManager) &&
    isSectionOrderInputValid($selectedLineManager, lineIndex)
  ) {
    addSectionToSelectedLine($selectedLineManager, lineIndex);
    showSelectedLineManager($selectedLineManager, lineIndex);
  } else {
    emptySectionOrderInputValue($selectedLineManager);
  }
};

const sectionRemoveButtonHandler = (e) => {
  const sectionIndex = e.target.dataset.sectionIndex * 1;
  const lineIndex = e.target.closest("tr").dataset.lineIndex * 1;
  const $selectedLineManager = e.target.closest(
    `#${SECTION_MANAGER_CONTAINERS_ID.selectedLineManager}`
  );
  if (
    !isNumberOfSectionTwoOrLess(lineIndex) &&
    confirm(`${e.target.dataset.stationName}을 제거하시겠습니까?`)
  ) {
    new LineManager().removeSection(lineIndex, sectionIndex);
    showSelectedLineManager($selectedLineManager, lineIndex);
  }
};

export default function sectionManagerClickHandler(e) {
  if (e.target.className === SECTION_LINE_MENU_BUTTON) {
    selectedLineManagerHandler(e);
  } else if (e.target.id === ADD_BUTTONS_ID.sectionAddButton) {
    sectionAddButtonHandler(e);
  } else if (e.target.className === DELETE_BUTTONS_CLASS.sectionDeleteButton) {
    sectionRemoveButtonHandler(e);
  }
}

import { state, saveToLocalStorage } from "../index.js";
import { LINE_ARRAY_KEY, SECTION_TAGS } from "../global/constant.js";
import { CONFIRM_MESSAGES } from "../global/messages.js";
import { SECTION_HTML, makeSectionHtml } from "../global/innerHtml.js";
import { getStationByName } from "../utils/global-utils.js";
import {
  makeNewElementWithInnerHtml,
  makeNewTdWithElement
} from "../utils/display/make-elements.js";
import sectionInputValidator, {
  checkZero
} from "../utils/inputs/validator/section-input-validator.js";

import clearInput from "../utils/inputs/clear-input.js";

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function loadEditSectionLines() {
  const parentDiv = document.getElementById(SECTION_TAGS.PARENT_SECTION_ID);

  for (const line of state.subwayLines) {
    const lineManageButton = makeNewElementWithInnerHtml("button", line.lineName);
    lineManageButton.classList.add(SECTION_TAGS.LINE_MENU_BUTTON_CLASS);
    lineManageButton.dataset.id = `manage-${line.id}`;

    parentDiv.append(lineManageButton);
  }
}

function indexOfNewElement(sectionInput, stationsInLine) {
  if (sectionInput < stationsInLine.length) {
    return sectionInput;
  }
  return stationsInLine.length;
}

function addSectionInput(input, option, line, tableBody) {
  const sectionInputValue = checkZero(input.value);

  if (sectionInputValidator(sectionInputValue, option.value, line.stations)) {
    const newStation = getStationByName(option.value);
    const newIndex = indexOfNewElement(sectionInputValue, line.stations);
    const tr = makeOneRow(newStation, newIndex, line, tableBody);
    line.stations.splice(parseInt(sectionInputValue), 0, newStation);

    updateAddedIndex(newIndex, tableBody.children);
    tableBody.insertBefore(tr, tableBody.children[newIndex]);
    saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
    clearInput(input);
  } else {
    clearInput(input);
  }
}

function makeSelectOptions(stationArray) {
  const selectWrapper = document.createElement("select");
  selectWrapper.id = SECTION_TAGS.STATION_SELECTOR_ID;

  for (const station of stationArray) {
    const option = `<option value="${station.stationName}">${station.stationName}</option>`;
    appendHtmlToParent(selectWrapper, option);
  }
  return selectWrapper;
}

function makeSectionManager(stationArray, wrapper, parent) {
  const selectWrapper = makeSelectOptions(stationArray);

  appendHtmlToParent(wrapper, SECTION_HTML.SECTION_TABLE_HTML);
  wrapper.append(selectWrapper);
  appendHtmlToParent(wrapper, SECTION_HTML.SECTION_INPUT_HTML);
  parent.append(wrapper);
}

export default function sectionManageContainer() {
  loadEditSectionLines();
  const parentDiv = document.getElementById(SECTION_TAGS.PARENT_SECTION_ID);
  const lineWrapperDiv = document.createElement("div");
  lineWrapperDiv.id = "manage-wrapper";

  for (const line of state.subwayLines) {
    const manage = document.querySelector(`[data-id="manage-${line.id}"]`);
    manage.addEventListener("click", () => {
      removeAllChild(lineWrapperDiv);
      appendHtmlToParent(lineWrapperDiv, makeSectionHtml(line.lineName));
      makeSectionManager(state.stationArray, lineWrapperDiv, parentDiv);

      const table = document.getElementById("section-table");
      const tableBody = document.getElementById("section-tbody");

      const selectedOption = document.getElementById(SECTION_TAGS.STATION_SELECTOR_ID);
      const sectionInput = document.getElementById(SECTION_TAGS.ORDER_INPUT_ID);
      const addSectionInputButton = document.getElementById(SECTION_TAGS.ADD_BUTTON_ID);

      addSectionInputButton.addEventListener("click", () => {
        addSectionInput(sectionInput, selectedOption, line, tableBody);
      });

      showTableItems(line, tableBody);
      table.append(tableBody);
      lineWrapperDiv.append(table);
    });
  }
}

// TODO - utils로 빼기

function appendHtmlToParent(parent, html) {
  const htmlDOM = new DOMParser().parseFromString(html, "text/html").body.childNodes;

  for (const node of htmlDOM) {
    parent.append(node);
  }
}

function updateDeletedIndex(currentIndex, trDatas) {
  for (let index = parseInt(currentIndex.innerHTML); index < trDatas.length; index++) {
    trDatas[index].firstChild.innerHTML = parseInt(trDatas[index].firstChild.innerHTML) - 1;
  }
}

function updateAddedIndex(currentIndex, trDatas) {
  for (let index = parseInt(currentIndex); index < trDatas.length; index++) {
    trDatas[index].firstChild.innerHTML = parseInt(trDatas[index].firstChild.innerHTML) + 1;
  }
}

function deletedStationFromLine(currentStations, deleteButton) {
  return currentStations.filter(
    station => parseInt(deleteButton.dataset.id) !== parseInt(station.id)
  );
}

function deleteStationFromLine(tr, line, tableBody) {
  if (confirm(CONFIRM_MESSAGES.CONFIRM_DELETE)) {
    line.stations = deletedStationFromLine(line.stations, tr.childNodes[2].firstChild);
    tr.remove();

    updateDeletedIndex(tr.childNodes[0], tableBody.children);
  }
  saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
}

function makeTdDeleteButton(station, tr, line, tableBody) {
  const tdDeleteButton = makeNewElementWithInnerHtml("button", "노선에서 삭제");
  tdDeleteButton.class = SECTION_TAGS.DELETE_BUTTON_CLASS;
  tdDeleteButton.dataset.id = station.id;

  tdDeleteButton.addEventListener("click", () => {
    deleteStationFromLine(tr, line, tableBody);
  });

  return tdDeleteButton;
}

function makeTrWithDataset(station, index) {
  const tr = document.createElement("tr");
  tr.dataset.stationId = station.id;
  tr.dataset.trId = index;

  return tr;
}

function makeOneRow(station, index, line, tableBody) {
  const tr = makeTrWithDataset(station, index);
  const tdIndex = makeNewElementWithInnerHtml("td", index);
  const tdStationName = makeNewElementWithInnerHtml("td", station.stationName);
  const tdDeleteButton = makeTdDeleteButton(station, tr, line, tableBody);
  const tdDelete = makeNewTdWithElement(tdDeleteButton);
  tr.append(...[tdIndex, tdStationName, tdDelete]);

  return tr;
}

function showTableItems(line, tableBody) {
  for (const [index, station] of Object.entries(line.stations)) {
    const tr = makeOneRow(station, index, line, tableBody);
    tableBody.append(tr);
  }
}

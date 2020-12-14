import { state, saveToLocalStorage } from "../index.js";
import { LINE_ARRAY_KEY } from "../global/constant.js";
import { getStationByName } from "../utils/global-utils.js";
import {
  makeNewElementWithInnerHtml,
  makeNewTdWithElement,
} from "../utils/display/make-elements.js";
import sectionInputValidator, {
  checkStationInputZero,
} from "../utils/inputs/validator/section-input-validator.js";
import clearInput from "../utils/inputs/clear-input.js";
import { CONFIRM_MESSAGES } from "../global/messages.js";

const SECTION_TAGS = {
  PARENT_SECTION_ID: "manage-sections",
  LINE_MENU_BUTTON_CLASS: "section-line-menu-button",
  STATION_SELECTOR_ID: "section-station-selector",
  ORDER_INPUT_ID: "section-order-input",
  ADD_BUTTON_ID: "section-add-button",
  DELETE_BUTTON_CLASS: "section-delete-button",
};

function makeSectionHtml(lineName) {
  return `
    <div id="choose-line">
      <h4>${lineName} 관리</h4>
      <h5>구간 등록</h5>
    </div>`;
}

const SECTION_HTML = {
  SECTION_INPUT_HTML: `
    <input id=${SECTION_TAGS.ORDER_INPUT_ID} placeholder="순서" />
    <button type="submit" id=${SECTION_TAGS.ADD_BUTTON_ID}>등록</button>
  `,
  SECTION_TABLE_HTML: `
    <table border="1" id="section-table">
      <thead>
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
      </thead>
      <tbody id="section-tbody"></tbody>
    </table>`,
};

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function loadEditSectionLines() {
  const parentDiv = document.getElementById(SECTION_TAGS.PARENT_SECTION_ID);

  for (const line of state.subwayLines) {
    const lineManageBtn = makeNewElementWithInnerHtml("button", line.lineName);
    lineManageBtn.classList.add(SECTION_TAGS.LINE_MENU_BUTTON_CLASS);
    lineManageBtn.dataset.id = `manage-${line.id}`;

    parentDiv.append(lineManageBtn);
  }
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

      const selectWrapper = document.createElement("select");
      selectWrapper.id = SECTION_TAGS.STATION_SELECTOR_ID;

      for (const station of state.stationArray) {
        const option = `<option value="${station.stationName}">${station.stationName}</option>`;
        appendHtmlToParent(selectWrapper, option);
      }
      appendHtmlToParent(lineWrapperDiv, SECTION_HTML.SECTION_TABLE_HTML);
      lineWrapperDiv.append(selectWrapper);
      appendHtmlToParent(lineWrapperDiv, SECTION_HTML.SECTION_INPUT_HTML);
      parentDiv.append(lineWrapperDiv);

      const table = document.getElementById("section-table");
      const tableBody = document.getElementById("section-tbody");

      const sectionInput = document.getElementById(SECTION_TAGS.ORDER_INPUT_ID);
      const selectedOption = document.getElementById(
        SECTION_TAGS.STATION_SELECTOR_ID
      );
      const addSectionInputBtn = document.getElementById(
        SECTION_TAGS.ADD_BUTTON_ID
      );

      addSectionInputBtn.addEventListener("click", () => {
        const sectionInputValue = checkStationInputZero(sectionInput.value);
        if (
          sectionInputValidator(
            sectionInputValue,
            selectedOption.value,
            line.stations
          )
        ) {
          const tr = document.createElement("tr");
          const newStation = getStationByName(selectedOption.value);
          tr.dataset.stationId = newStation.id;

          let indexOfNewElement = line.stations.length;
          if (sectionInputValue < line.stations.length) {
            indexOfNewElement = sectionInputValue;
          }

          tr.dataset.trId = indexOfNewElement;

          const tdIndex = makeNewElementWithInnerHtml("td", indexOfNewElement);
          const tdStationName = makeNewElementWithInnerHtml(
            "td",
            newStation.stationName
          );
          line.stations.splice(parseInt(sectionInputValue), 0, newStation);

          const tdDeleteBtn = makeNewElementWithInnerHtml(
            "button",
            "노선에서 삭제"
          );
          tdDeleteBtn.class = SECTION_TAGS.DELETE_BUTTON_CLASS;
          tdDeleteBtn.dataset.id = newStation.id;

          const tdDelete = makeNewTdWithElement(tdDeleteBtn);

          tdDeleteBtn.addEventListener("click", () => {
            deleteStationFromLine(tr, line, tableBody);
          });

          updateAddedIndex(indexOfNewElement, tableBody.children);
          tr.append(...[tdIndex, tdStationName, tdDelete]);
          tableBody.insertBefore(tr, tableBody.children[indexOfNewElement]);
          saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
          clearInput(sectionInput);
        } else {
          clearInput(sectionInput);
        }
      });

      showTableItems(line, tableBody);
      table.append(tableBody);
      lineWrapperDiv.append(table);
    });
  }
}

// TODO - utils로 빼기

function appendHtmlToParent(parent, html) {
  const htmlDOM = new DOMParser().parseFromString(html, "text/html").body
    .childNodes;

  for (const node of htmlDOM) {
    parent.append(node);
  }
}

function updateDeletedIndex(currentIndex, trDatas) {
  for (
    let index = parseInt(currentIndex.innerHTML);
    index < trDatas.length;
    index++
  ) {
    trDatas[index].firstChild.innerHTML =
      parseInt(trDatas[index].firstChild.innerHTML) - 1;
  }
}

function updateAddedIndex(currentIndex, trDatas) {
  for (let index = parseInt(currentIndex); index < trDatas.length; index++) {
    trDatas[index].firstChild.innerHTML =
      parseInt(trDatas[index].firstChild.innerHTML) + 1;
  }
}

function deletedStationFromLine(currentStations, deleteBtn) {
  return currentStations.filter(
    (station) => parseInt(deleteBtn.dataset.id) !== parseInt(station.id)
  );
}

function deleteStationFromLine(tr, line, tableBody) {
  if (confirm(CONFIRM_MESSAGES.CONFIRM_DELETE)) {
    line.stations = deletedStationFromLine(
      line.stations,
      tr.childNodes[2].firstChild
    );
    tr.remove();

    updateDeletedIndex(tr.childNodes[0], tableBody.children);
  }
  saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
}

function showTableItems(line, tableBody) {
  for (const [index, station] of Object.entries(line.stations)) {
    const tr = document.createElement("tr");
    tr.dataset.stationId = station.id;
    tr.dataset.trId = index;
    const tdIndex = makeNewElementWithInnerHtml("td", index);
    const tdStationName = makeNewElementWithInnerHtml(
      "td",
      station.stationName
    );

    const tdDeleteBtn = makeNewElementWithInnerHtml("button", "노선에서 삭제");
    tdDeleteBtn.class = SECTION_TAGS.DELETE_BUTTON_CLASS;
    tdDeleteBtn.dataset.id = station.id;
    const tdDelete = makeNewTdWithElement(tdDeleteBtn);

    tr.append(...[tdIndex, tdStationName, tdDelete]);
    tableBody.append(tr);

    tdDeleteBtn.addEventListener("click", () => {
      deleteStationFromLine(tr, line, tableBody);
    });
  }
}

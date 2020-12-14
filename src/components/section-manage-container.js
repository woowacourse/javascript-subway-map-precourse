import { state, saveToLocalStorage } from "../index.js";
import { LINE_ARRAY_KEY } from "../global/constant.js";
import { getStationByName } from "../utils/global-utils.js";

const SECTION_TAGS = {
  PARENT_SECTION_ID: "manage-sections",
  LINE_MENU_BUTTON_CLASS: "section-line-menu-button",
  STATION_SELECTOR_ID: "section-station-selector",
  ORDER_INPUT_ID: "section-order-input",
  ADD_BUTTON_ID: "section-add-button",
  DELETE_BUTTON_CLASS: "section-delete-button"
};

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function loadEditSectionLines() {
  const parentDiv = document.getElementById(SECTION_TAGS.PARENT_SECTION_ID);

  for (const line of state.subwayLines) {
    const lineManageBtn = newElementWithInnerHtml("button", line.lineName);
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

      const manageHTML = `
        <div id="choose-line">
          <h4>${line.lineName} 관리</h4>
          <h5>구간 등록</h5>
        </div>
      `;
      appendHTML(lineWrapperDiv, manageHTML);

      const selectWrapper = document.createElement("select");
      selectWrapper.id = SECTION_TAGS.STATION_SELECTOR_ID;

      for (const station of state.stationArray) {
        const option = `<option value="${station.stationName}">${station.stationName}</option>`;
        appendHTML(selectWrapper, option);
      }
      lineWrapperDiv.append(selectWrapper);

      const sectionInputHTML = `
          <input id=${SECTION_TAGS.ORDER_INPUT_ID} placeholder="순서" />
          <button type="submit" id=${SECTION_TAGS.ADD_BUTTON_ID}>등록</button>
      `;
      appendHTML(lineWrapperDiv, sectionInputHTML);

      const sectionTableHTML = `
        <table border="1" id="section-table">
          <thead>
            <tr>
              <th>순서</th>
              <th>이름</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody id="section-tbody"></tbody>
        </table>
      `;
      appendHTML(lineWrapperDiv, sectionTableHTML);

      parentDiv.append(lineWrapperDiv);

      const table = document.getElementById("section-table");
      const tableBody = document.getElementById("section-tbody");

      const sectionInputBtn = document.getElementById(SECTION_TAGS.ADD_BUTTON_ID);
      const sectionInput = document.getElementById(SECTION_TAGS.ORDER_INPUT_ID);
      const selectedOption = document.getElementById(SECTION_TAGS.STATION_SELECTOR_ID);

      sectionInputBtn.addEventListener("click", () => {
        const tr = document.createElement("tr");
        tr.dataset.stationId = getStationByName(selectedOption.value).id;

        let indexOfNewElement = line.stations.length;
        if (sectionInput.value < line.stations.length) {
          indexOfNewElement = sectionInput.value;
        }
        tr.dataset.trId = indexOfNewElement;

        const tdIndex = newElementWithInnerHtml("td", indexOfNewElement);
        const tdStationName = newElementWithInnerHtml(
          "td",
          getStationByName(selectedOption.value).stationName
        );
        line.stations.splice(
          parseInt(sectionInput.value),
          0,
          getStationByName(selectedOption.value)
        );

        const tdDeleteBtn = newElementWithInnerHtml("button", "노선에서 삭제");
        tdDeleteBtn.class = SECTION_TAGS.DELETE_BUTTON_CLASS;
        tdDeleteBtn.dataset.id = getStationByName(selectedOption.value).id;

        const tdDelete = newTdWithElement(tdDeleteBtn);

        tdDeleteBtn.addEventListener("click", () => {
          if (confirm("정말로 삭제하시겠습니까?")) {
            const deleteStationFromLine = line.stations.filter(station => {
              return parseInt(tdDeleteBtn.dataset.id) !== parseInt(station.id);
            });
            tr.remove();

            line.stations = deleteStationFromLine;
            for (
              let index = parseInt(tdIndex.innerHTML);
              index < tableBody.children.length;
              index++
            ) {
              tableBody.children[index].firstChild.innerHTML =
                parseInt(tableBody.children[index].firstChild.innerHTML) - 1;
            }
          }
          saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
        });

        for (let index = parseInt(indexOfNewElement); index < tableBody.children.length; index++) {
          tableBody.children[index].firstChild.innerHTML =
            parseInt(tableBody.children[index].firstChild.innerHTML) + 1;
        }

        tr.append(...[tdIndex, tdStationName, tdDelete]);
        tableBody.insertBefore(tr, tableBody.children[indexOfNewElement]);

        saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
      });

      for (const [index, station] of Object.entries(line.stations)) {
        const tr = document.createElement("tr");
        tr.dataset.stationId = station.id;
        tr.dataset.trId = index;

        const tdIndex = newElementWithInnerHtml("td", index);
        const tdStationName = newElementWithInnerHtml("td", station.stationName);

        const tdDeleteBtn = newElementWithInnerHtml("button", "노선에서 삭제");
        tdDeleteBtn.class = SECTION_TAGS.DELETE_BUTTON_CLASS;
        tdDeleteBtn.dataset.id = station.id;

        const tdDelete = newTdWithElement(tdDeleteBtn);

        tdDeleteBtn.addEventListener("click", () => {
          if (confirm("정말로 삭제하시겠습니까?")) {
            const deleteStationFromLine = line.stations.filter(station => {
              return parseInt(tdDeleteBtn.dataset.id) !== parseInt(station.id);
            });
            tr.remove();

            line.stations = deleteStationFromLine;

            for (
              let index = parseInt(tdIndex.innerHTML);
              index < tableBody.children.length;
              index++
            ) {
              tableBody.children[index].firstChild.innerHTML =
                parseInt(tableBody.children[index].firstChild.innerHTML) - 1;
            }
          }
          saveToLocalStorage(LINE_ARRAY_KEY, JSON.stringify(state.subwayLines));
        });

        tr.append(...[tdIndex, tdStationName, tdDelete]);
        tableBody.append(tr);
      }
      table.append(tableBody);
      lineWrapperDiv.append(table);
    });
  }
}

// TODO - utils로 빼기
function newElementWithInnerHtml(elementType, innerHTML) {
  const element = document.createElement(elementType);
  element.innerHTML = innerHTML;

  return element;
}

function newTdWithElement(element) {
  const td = document.createElement("td");
  td.append(element);

  return td;
}

function appendHTML(parent, html) {
  const htmlDOM = new DOMParser().parseFromString(html, "text/html").body.childNodes;

  for (const node of htmlDOM) {
    parent.append(node);
  }
}

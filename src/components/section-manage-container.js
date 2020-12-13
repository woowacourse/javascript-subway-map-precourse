import { state } from "../index.js";

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function loadEditSectionLines() {
  const parentDiv = document.getElementById("manage-sections");

  for (const line of state.subwayLines) {
    const lineManageBtn = newElementWithInnerHtml("button", line.lineName);
    lineManageBtn.id = `manage${line.id}`;

    parentDiv.append(lineManageBtn);
  }
}

export default function sectionManageContainer() {
  loadEditSectionLines();
  const parentDiv = document.getElementById("manage-sections");
  const lineWrapperDiv = document.createElement("div");
  lineWrapperDiv.id = "manage-wrapper";

  for (const line of state.subwayLines) {
    const manage = document.getElementById(`manage${line.id}`);

    manage.addEventListener("click", () => {
      removeAllChild(lineWrapperDiv);

      const manageHTML = `
        <div id="choose-line">
          <h4>${line.lineName} 관리</h4>
          <h5>구간 등록</h5>
        </div>
      `;
      appendHTML(lineWrapperDiv, manageHTML);

      // select stations
      const selectWrapper = document.createElement("select");

      for (const station of state.stationArray) {
        const option = `<option value="${station.stationName}">${station.stationName}</option>`;
        appendHTML(selectWrapper, option);
      }
      lineWrapperDiv.append(selectWrapper);

      // input
      const sectionInputHTML = `
          <input placeholder="순서" />
          <button type="submit">등록</button>
      `;
      appendHTML(lineWrapperDiv, sectionInputHTML);

      // table
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

      // table items
      const table = document.getElementById("section-table");
      const tableBody = document.getElementById("section-tbody");

      for (const [index, station] of Object.entries(line.stations)) {
        const tr = document.createElement("tr");
        const tdIndex = newElementWithInnerHtml("td", index);
        const tdStationName = newElementWithInnerHtml(
          "td",
          station.stationName
        );

        const tdDeleteBtn = newElementWithInnerHtml("button", "노선에서 삭제");
        tdDeleteBtn.id = station.id;

        const tdDelete = newTdWithElement(tdDeleteBtn);

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
  const htmlDOM = new DOMParser().parseFromString(html, "text/html").body
    .childNodes;

  for (const node of htmlDOM) {
    parent.append(node);
  }
}

import addSectionEvent from "../event/section/addSectionEvent.js";
import delSectionEvent from "../event/section/delSectionEvent.js";

function lineSelectButtonTemplate() {
  const lines = JSON.parse(localStorage.lines);

  return lines
    .map(
      (line) =>
        `<button class="section-line-menu-button" data-name=${line.name}>${line.name}</button>`
    )
    .join(" ");
}

function initLineSelectButtonCotainer() {
  const $lineSelectButtonContainer = document.getElementById("line-select-button-container");
  $lineSelectButtonContainer.innerHTML = lineSelectButtonTemplate();
}

export function renderLineButton() {
  initLineSelectButtonCotainer();
}

function sectionInputTemplate(line) {
  return `<h3>${line}</h3>
          <h4>구간 등록</h4>
          <div id="section-input-container">
            <select id="section-station-selector"></select>
            <input type="number" id="section-order-input"></input>
            <button id="section-add-button">등록</button>
          </div>`;
}

function initSectionInputContainer(selectedLine) {
  const $sectionInputContainer = document.getElementById("section-input-container");
  $sectionInputContainer.innerHTML = sectionInputTemplate(selectedLine);

  addSectionEvent(selectedLine);
}

function sectionSelectorTemplate() {
  const stations = JSON.parse(localStorage.stations);
  let newHTML = "";

  stations.forEach((station) => (newHTML += `<option>${station}</option>`));

  return newHTML;
}

function initSectionSelector() {
  const $sectionStationSelector = document.getElementById("section-station-selector");
  $sectionStationSelector.innerHTML = sectionSelectorTemplate();
}

function sectionTableTemplate() {
  return `<h4><table class="section-table" border="1">
            <tr>
              <th>순서</th>
              <th>이름</th>
              <th>설정</th>
            </tr>
          </table><h4>`;
}

function initSectionTableContainer() {
  const $sectionTableContainer = document.getElementById("section-table-container");
  $sectionTableContainer.innerHTML = sectionTableTemplate();
}

function sectionListTemplate(section, sectionNumber) {
  return `<tr class="section-table-row" data-number=${sectionNumber}>
            <td>
              ${sectionNumber}
            </td>
            <td>
              <span>${section}</span>
            </td>
            <td>
              <button class="section-delete-button">노선에서 제거</button>
            </td>
          </tr>
            `;
}

function initSectionList(selectedLine) {
  const lines = JSON.parse(localStorage.lines);
  const $sectionTable = document.querySelector(".section-table");
  let sectionNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    if (selectedLine === lines[i].name) {
      lines[i].sections.forEach((section) =>
        $sectionTable.insertAdjacentHTML("beforeend", sectionListTemplate(section, sectionNumber++))
      );
    }
  }

  delSectionEvent(selectedLine);
}

export function renderSection(selectedLine) {
  initSectionInputContainer(selectedLine);
  initSectionSelector();
  initSectionTableContainer();
  initSectionList(selectedLine);
}

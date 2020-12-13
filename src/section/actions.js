import { loadLines, saveLines } from "../line/actions.js";
import { loadStations, useStation, disUseStation } from "../station/actions.js";
import {
  sectionLineMenu,
  sectionStationInputForm,
  sectionList,
  sectionListHeader,
  sectionDeleteBtn,
} from "./templates.js";

let sectionline;

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = sectionLineMenu;
};

const createSectionLineMenu = (_lines) => {
  const sectionLineMenu = document.getElementById("section-line-menu");

  for (let i = 0; i < _lines.length; i++) {
    sectionLineMenu.innerHTML += `<button class="section-line-menu-button">${_lines[i].name}</button>`;
  }
};

const createSectionLineContainer = (_lineName) => {
  const sectionLineContainer = document.getElementById(
    "section-line-container"
  );

  sectionLineContainer.innerHTML =
    `<h3>${sectionline.name} 관리</h3>` + sectionStationInputForm + sectionList;
};

const createSectionStationSelector = (_stations) => {
  const sectionStationSelector = document.getElementById(
    "section-station-selector"
  );

  for (let i = 0; i < _stations.length; i++) {
    sectionStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
  }
};

const createSectionList = () => {
  const sections = sectionline.inLineStations;
  const sectionNames = document.getElementById("section-names");

  sectionNames.innerHTML = sectionListHeader;

  for (let i = 0; i < sections.length; i++) {
    sectionNames.innerHTML += `
    <tr data-section-index="${i}">
      <td class="section-order">${i}</td>
      <td>${sections[i]}</td>
      ${sectionDeleteBtn}
    </tr>
    `;
  }
};

const setSectionLine = (_lineName) => {
  sectionline = loadLines().find((x) => x.name === _lineName);
};

const setSectionLineMenuBtn = () => {
  const sectionLineMenuBtn = document.getElementsByClassName(
    "section-line-menu-button"
  );

  for (let i = 0; i < sectionLineMenuBtn.length; i++) {
    sectionLineMenuBtn[i].addEventListener("click", (e) => {
      setSectionLine(e.target.innerText);
      createSectionLineContainer();
      createSectionStationSelector(loadStations());
      createSectionList();
    });
  }
};

export default function SectionManager() {
  printLayout();
  createSectionLineMenu(loadLines());
  setSectionLineMenuBtn();
}

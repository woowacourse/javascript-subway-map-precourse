import { isNegative, isInLine } from "../utils.js";
import { loadLines, saveLines } from "../line/actions.js";
import { loadStations, useStation, disUseStation } from "../station/actions.js";
import {
  sectionLineMenu,
  sectionStationInputForm,
  sectionList,
  sectionListHeader,
  sectionDeleteBtn,
} from "./templates.js";

let sectionLineName;

const getSectionLine = () => {
  return loadLines().find((x) => x.name === sectionLineName);
};

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = sectionLineMenu;
};

const createSectionLineMenu = (_lines) => {
  const sectionLineMenu = document.getElementById("section-line-menu");

  for (let i = 0; i < _lines.length; i++) {
    sectionLineMenu.innerHTML += `<button class="section-line-menu-button">${_lines[i].name}</button>\n`;
  }
};

const createSectionLineContainer = () => {
  const sectionLineContainer = document.getElementById(
    "section-line-container"
  );

  sectionLineContainer.innerHTML =
    `<h3>${sectionLineName} 관리</h3>` + sectionStationInputForm + sectionList;
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
  const sections = getSectionLine().inLineStations;
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

const getSectionStationName = () => {
  return document.getElementById("section-station-selector").value;
};

const getSectioOrder = () => {
  const sectionOrder = document.getElementById("section-order-input").value;

  document.getElementById("section-order-input").value = "";

  return sectionOrder;
};

const isValid = (_sectionStationName, _sectionOrder) => {
  if (isInLine(getSectionLine().inLineStations, _sectionStationName)) {
    alert("노선의 구간은 중복일 수 없습니다.");
    return;
  }

  if (isNegative(_sectionOrder) || !Number.isInteger(Number(_sectionOrder))) {
    alert("순서는 0 이상의 자연수를 입력해주세요.");
    return;
  }

  return true;
};

const addSection = () => {
  const lines = loadLines();
  const sectionStationName = getSectionStationName();
  const sectionOrder = getSectioOrder();

  if (isValid(sectionStationName, sectionOrder)) {
    lines
      .find((x) => x.name === sectionLineName)
      .add(sectionStationName, sectionOrder);
    saveLines(lines);
  }
};

const setSectionAddBtn = () => {
  const sectionAddBtn = document.getElementById("section-add-button");

  sectionAddBtn.addEventListener("click", () => {
    addSection();
    createSectionList();
  });
};

const setSectionLineMenuBtn = () => {
  const sectionLineMenuBtn = document.getElementsByClassName(
    "section-line-menu-button"
  );

  for (let i = 0; i < sectionLineMenuBtn.length; i++) {
    sectionLineMenuBtn[i].addEventListener("click", (e) => {
      sectionLineName = e.target.innerText;

      createSectionLineContainer();
      createSectionStationSelector(loadStations());
      setSectionAddBtn();
      createSectionList();
    });
  }
};

export default function SectionManager() {
  printLayout();
  createSectionLineMenu(loadLines());
  setSectionLineMenuBtn();
}

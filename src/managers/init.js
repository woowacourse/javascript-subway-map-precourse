import { onStationHandler } from "./handlers/stationHandlers.js";
import { onLineHandler } from "./handlers/lineHandlers.js";
import { onSectionHandler } from "./handlers/sectionHandler.js";
import { onMapPrintHandler } from "./handlers/mapPrintHandler.js";
import { STATION_MANAGER_BUTTON, LINE_MANAGER_BUTTON, SECTION_MANAGER_BUTTON, MAP_PRINT_MANAGER_BUTTON } from "../constants/tag.js";

function initHTML() {
  const buttonBox = document.createElement("div");

  buttonBox.innerHTML = `
   <button id=${STATION_MANAGER_BUTTON}>1. 역 관리</button>
    <button id=${LINE_MANAGER_BUTTON}>2. 노선 관리</button>
    <button id=${SECTION_MANAGER_BUTTON}>3. 구간 관리</button>
    <button id=${MAP_PRINT_MANAGER_BUTTON}>4. 지하철 노선도 출력</button>`;
  document.body.append(buttonBox);

  const mainBox = document.createElement("div");

  mainBox.id = "main-box";
  document.body.append(mainBox);
}

function addEventToMainBtns() {
  document.getElementById(STATION_MANAGER_BUTTON).addEventListener("click", onStationHandler);
  document.getElementById(LINE_MANAGER_BUTTON).addEventListener("click", onLineHandler);
  document.getElementById(SECTION_MANAGER_BUTTON).addEventListener("click", onSectionHandler);
  document.getElementById(MAP_PRINT_MANAGER_BUTTON).addEventListener("click", onMapPrintHandler);
}

export { initHTML, addEventToMainBtns };

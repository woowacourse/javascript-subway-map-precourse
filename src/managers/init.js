import { onStationHandler } from "./handlers/stationHandlers.js";
import { onLineHandler } from "./handlers/lineHandlers.js";
import { onSectionHandler } from "./handlers/sectionHandler.js";
import { onMapPrintHandler } from "./handlers/mapPrintHandler.js";

function initHTML() {
  const buttonBox = document.createElement("div");
  buttonBox.innerHTML = `
   <button id="station-manager-button">1. 역 관리</button>
    <button id="line-manager-button">2. 노선 관리</button>
    <button id="section-manager-button">3. 구간 관리</button>
    <button id="map-print-manager-button">4. 지하철 노선도 출력</button>`;
  document.body.append(buttonBox);

  const mainBox = document.createElement("div");
  mainBox.id = "main-box";
  document.body.append(mainBox);
}

function addEventToMainBtns() {
  // const buttons = [{ name: "station-manager-button", handler: onStationHandler }]

  // buttons.forEach(({ name, handler }) => {
  //   document.getElementById(name).addEventListener("click", handler);
  // });
  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

export { initHTML, addEventToMainBtns };

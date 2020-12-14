import Subway from "./Subway.js";
import { cleanView } from "./utils/controlView.js";
import { getDataFromLocalStorage } from "./utils/getDataFromLocalStorage.js";
import {
  stationEventHandler,
  lineEventHandler,
  sectionEventHandler,
  mapPrintHandler,
} from "./utils/eventHandler.js";

const stationManagerButton = document.getElementById("station-manager-button");
const lineManagerButton = document.getElementById("line-manager-button");
const sectionManagerButton = document.getElementById("section-manager-button");
const mapPrintManageButton = document.getElementById("map-print-manage-button");

const init = () => {
  cleanView();
  let subway = new Subway();
  stationManagerButton.addEventListener(
    "click",
    stationEventHandler.bind(subway)
  );
  sectionManagerButton.addEventListener(
    "click",
    sectionEventHandler.bind(subway)
  );
  lineManagerButton.addEventListener("click", lineEventHandler.bind(subway));
  mapPrintManageButton.addEventListener("click", mapPrintHandler.bind(subway));
};

init();

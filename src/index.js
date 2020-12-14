import LineManager from "./pages/lineManager.js";
import PrintSubwayLine from "./pages/PrintSubwayLine.js";
import SectionManager from "./pages/SectionManager.js";
import StationManager from "./pages/StationManager.js";
import { dispatchReRender, RE_RENDER_EVENT } from "./utils/events.js";

const stationManager = new StationManager();
const lineManager = new LineManager();
const sectionManager = new SectionManager();
const printSubwayLine = new PrintSubwayLine();

const pages = document.querySelector("#app");
let page;

const stationManagerButton = document.getElementById("station-manager-button");
const lineManagerButton = document.getElementById("line-manager-button");
const sectionManagerButton = document.getElementById("section-manager-button");
const printSubwayLineButton = document.getElementById(
  "map-print-manager-button"
);

stationManagerButton.addEventListener("click", () => {
  page = stationManager;
  dispatchReRender();
});

lineManagerButton.addEventListener("click", () => {
  page = lineManager;
  dispatchReRender();
});

sectionManagerButton.addEventListener("click", () => {
  page = sectionManager;
  dispatchReRender();
});

printSubwayLineButton.addEventListener("click", () => {
  page = printSubwayLine;
  dispatchReRender();
});
function reRenderPage() {
  page.create();
  page.afterCreate();
  pages.innerHTML = page.render();
  page.mount();
}

window.addEventListener(RE_RENDER_EVENT, reRenderPage);

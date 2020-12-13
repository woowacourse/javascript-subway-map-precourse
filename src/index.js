import LineManager from "./pages/lineManager.js";
import StationManager from "./pages/StationManager.js";
import { dispatchReRender, RE_RENDER_EVENT } from "./utils/events.js";

const stationManager = new StationManager();
const lineManager = new LineManager();

const pages = document.querySelector("#app");

const stationManagerButton = document.getElementById("station-manager-button");
const lineManagerButton = document.getElementById("line-manager-button");

let page;

stationManagerButton.addEventListener("click", () => {
  page = stationManager;
  dispatchReRender();
});

lineManagerButton.addEventListener("click", () => {
  page = lineManager;
  dispatchReRender();
});

function reRenderPage() {
  pages.innerHTML = page.render();
  page.mount();
}

window.addEventListener(RE_RENDER_EVENT, reRenderPage);

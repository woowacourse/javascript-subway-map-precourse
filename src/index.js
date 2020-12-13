import LineManager from "./pages/lineManager.js";
import StationManager from "./pages/StationManager.js";

const RE_RENDER_EVENT = "customRender";
const reRenderEvent = new CustomEvent(RE_RENDER_EVENT);
const dispatchReRender = () => window.dispatchEvent(reRenderEvent);
export { dispatchReRender };

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

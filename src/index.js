import StationManager from "./pages/StationManager.js";

const RE_RENDER_EVENT = "customRender";
const reRenderEvent = new CustomEvent(RE_RENDER_EVENT);
const dispatchReRender = () => window.dispatchEvent(reRenderEvent);

const stationManager = new StationManager();

const pages = document.querySelector("#app");

const stationManagerButton = document.getElementById("station-manager-button");

let page;

stationManagerButton.addEventListener("click", () => {
  page = stationManager;
  dispatchReRender();
});

function reRenderPage() {
  pages.innerHTML = page.render();
}

window.addEventListener(RE_RENDER_EVENT, reRenderPage);

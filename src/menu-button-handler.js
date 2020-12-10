// import StationManager from "./station-manager.js";
import { getChildById } from "./custom-dom-handler.js";

const MENU_BUTTONS_ID = {
  stationManagerButton: "station-manager-button",
  lineManagerButton: "line-manager-button",
  sectionManagerButton: "section-manager-button",
  mapPrintManagerButton: "map-print-manager-button",
};

const renderStationAddForm = (container) => {
  container.innerHTML += `
  <div>
    <label for="station-name-input">
      역 이름<br />
      <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요." />
    </label>
    <button id="station-add-button">역 추가</button>
  </div>
  `;
};

const showStationManagerPage = (e) => {
  const $mainContentsContainer = getChildById(
    e.target.closest("#app"),
    "main-contents-container"
  );
  $mainContentsContainer.innerHTML = "";
  renderStationAddForm($mainContentsContainer);
};

export default function menuButtonHandler(e) {
  if (e.target.id === MENU_BUTTONS_ID.stationManagerButton) {
    showStationManagerPage(e);
  }
}

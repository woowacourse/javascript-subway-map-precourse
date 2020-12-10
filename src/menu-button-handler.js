import { getChildById } from "./custom-dom-handler.js";

const MENU_BUTTONS_ID = {
  stationManagerButton: "station-manager-button",
  lineManagerButton: "line-manager-button",
  sectionManagerButton: "section-manager-button",
  mapPrintManagerButton: "map-print-manager-button",
};

const MANAGER_PAGES_ID = {
  stationManager: "station-manager",
  lineManager: "line-manager",
  sectionManager: "section-manager",
  mapPrintManager: "map-print-manager",
};

const showManagerPageById = (container, id) => {
  Object.values(MANAGER_PAGES_ID).forEach((_pageId) => {
    if (_pageId === id) {
      getChildById(container, _pageId).style.display = "block";
    } else {
      getChildById(container, _pageId).style.display = "none";
    }
  });
};

export default function menuButtonHandler(e) {
  const app = e.target.closest("#app");
  const id = e.target.id;
  if (id === MENU_BUTTONS_ID.stationManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.stationManager);
  }
  if (id === MENU_BUTTONS_ID.lineManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.lineManager);
  }
  if (id === MENU_BUTTONS_ID.sectionManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.sectionManager);
  }
  if (id === MENU_BUTTONS_ID.mapPrintManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.mapPrintManager);
  }
}

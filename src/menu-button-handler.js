import StationManager from "./station-manager.js";
import { getChildById } from "./custom-dom-handler.js";
import {
  MENU_BUTTONS_ID,
  MANAGER_PAGES_ID,
} from "./html-constants/html-id-values.js";

const showManagerPageById = (container, id) => {
  Object.values(MANAGER_PAGES_ID).forEach((_pageId) => {
    if (_pageId === id) {
      getChildById(container, _pageId).style.display = "block";
    } else {
      getChildById(container, _pageId).style.display = "none";
    }
  });
};

const showStationManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.stationManager);
  new StationManager().renderStationNameTable();
};

export default function menuButtonHandler(e) {
  const app = e.target.closest("#app");
  const id = e.target.id;
  if (id === MENU_BUTTONS_ID.stationManagerButton) {
    showStationManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.lineManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.lineManager);
  } else if (id === MENU_BUTTONS_ID.sectionManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.sectionManager);
  } else if (id === MENU_BUTTONS_ID.mapPrintManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.mapPrintManager);
  }
}

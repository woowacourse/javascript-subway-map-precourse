import LineManager from "../components/LineManagerContainer/LineManager.js";
import MapPrintManager from "../components/MapPrintManagerContainer/MapPrintManager.js";
import SectionManager from "../components/SectionManagerContainer/SectionManager.js";
import StationManager from "../components/StationManagerContainer/StationManager.js";
import { INITIAL_STATE_ID, DOM_MENU } from "../utils/constants.js";

export default (state = INITIAL_STATE_ID) => {
  let nextState = {};

  switch (state) {
    case DOM_MENU.STATION_MANAGER_BUTTON_ID:
      nextState = new StationManager();
      break;

    case DOM_MENU.LINE_MANAGER_BUTTON_ID:
      nextState = new LineManager();
      break;

    case DOM_MENU.SECTION_MANAGER_BUTTON_ID:
      nextState = new SectionManager();
      break;

    case DOM_MENU.MAP_PRINT_MANAGER_BUTTON_ID:
      nextState = new MapPrintManager();
      break;

    default:
      console.log(new Error(state));
  }

  return nextState;
};

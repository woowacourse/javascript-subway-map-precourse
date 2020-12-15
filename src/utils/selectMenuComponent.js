import LineManager from "../components/LineManagerContainer/LineManager.js";
import MapPrintManager from "../components/MapPrintManagerContainer/MapPrintManager.js";
import SectionManager from "../components/SectionManagerContainer/SectionManager.js";
import StationManager from "../components/StationManagerContainer/StationManager.js";
import { INITIAL_STATE_ID, DOM_MENU } from "../utils/constants.js";

export default (stateId = INITIAL_STATE_ID) => {
  let nextState = {};

  switch (stateId) {
    case DOM_MENU.STATION_MANAGER_BUTTON_ID:
      nextState = new StationManager(stateId);
      break;

    case DOM_MENU.LINE_MANAGER_BUTTON_ID:
      nextState = new LineManager(stateId);
      break;

    case DOM_MENU.SECTION_MANAGER_BUTTON_ID:
      nextState = new SectionManager(stateId);
      break;

    case DOM_MENU.MAP_PRINT_MANAGER_BUTTON_ID:
      nextState = new MapPrintManager(stateId);
      break;

    default:
      console.log(new Error(stateId));
  }

  return nextState;
};

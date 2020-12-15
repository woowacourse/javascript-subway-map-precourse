import { DOM_MENU } from "./constants.js";

export default (stateId) => {
  if (stateId === DOM_MENU.STATION_MANAGER_BUTTON_ID) return "STATION";
  return "LINE";
};

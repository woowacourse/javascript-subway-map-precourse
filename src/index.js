import menuButtonHandler from "./handlers/menu-button-handler.js";
import stationManagerClickHandler from "./handlers/station-manager-click-handler.js";
import lineManagerClickHandler from "./handlers/line-manager-click-handler.js";

document.addEventListener("click", menuButtonHandler);
document.addEventListener("click", stationManagerClickHandler);
document.addEventListener("click", lineManagerClickHandler);

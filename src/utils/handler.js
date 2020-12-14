import { clearContainer } from "./utils.js";
import { initStationManager } from "../managers/station.js";
import { initLineManager } from "../managers/line.js";
import { initSectionManager } from "../managers/section.js";
import { initMapManager } from "../managers/map.js";
import { container } from "../consts/consts.js";

export const handleStationManager = () => {
  clearContainer(container);
  initStationManager();
};

export const handleLineManager = () => {
  clearContainer(container);
  initLineManager();
};

export const handleSectionManager = () => {
  clearContainer(container);
  initSectionManager();
};

export const handleMapPrintManager = () => {
  clearContainer(container);
  initMapManager();
};

export const handlerArray = [
  handleStationManager,
  handleLineManager,
  handleSectionManager,
  handleMapPrintManager,
];

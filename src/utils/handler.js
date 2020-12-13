import { clearContainer } from "./utils.js";
import { initStationManager } from "../managers/station.js";
import { initLineManager } from "../managers/line.js";

export const handleStationManager = () => {
  clearContainer();
  initStationManager();
};

export const handleLineManager = () => {
  clearContainer();
  initLineManager();
};

export const handleSectionManager = () => {
  clearContainer();
};

export const handleMapPrintManager = () => {
  clearContainer();
};

export const handlerArray = [
  handleStationManager,
  handleLineManager,
  handleSectionManager,
  handleMapPrintManager,
];

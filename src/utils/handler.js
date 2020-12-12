import { clearContainer } from "./utils.js";
import { initStationManager } from "../managers/station.js";

export const handleStationManager = () => {
  clearContainer();
  initStationManager();
};

export const handleLineManager = () => {
  clearContainer();
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

import { clearContainer } from "./utils";

export const handleStationManager = () => {
  clearContainer();
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

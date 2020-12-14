import { ID } from '../constants/index.js';

export const initialize = () => {
  const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
  const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
  const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
  const mapPrintManager = document.querySelector(`#${ID.MAP_PRINT_MANAGER}`);

  removeAllNode(stationManager);
  removeAllNode(lineManager);
  removeAllNode(sectionManager);
  removeAllNode(mapPrintManager);
};

const removeAllNode = (manager) => {
  while (manager.hasChildNodes()) {
    manager.removeChild(manager.firstChild);
  }
};

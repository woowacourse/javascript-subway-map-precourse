import { ID } from '../constants/index.js';

export const initialize = () => {
  const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
  const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
  const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);

  removeAllNode(stationManager);
  removeAllNode(lineManager);
  removeAllNode(sectionManager);
};

const removeAllNode = (manager) => {
  while (manager.hasChildNodes()) {
    manager.removeChild(manager.firstChild);
  }
};

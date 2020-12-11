import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainLayout.js';
import { stationElements } from './layout/station.js';
import { lineElements } from './layout/line.js';

const initHTML = function () {
  app.append(managerContainer, sectionContainer);
  managerContainer.append(
    stationElements.managerButton,
    lineElements.managerButton,
  );
};

initHTML();

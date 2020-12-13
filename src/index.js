import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainLayout.js';
import StationLayout from './layout/stationLayout.js';
import { lineElements } from './layout/line.js';
import { sectionElements } from './layout/section.js';
import { mapPrintElements } from './layout/mapPrintLayout.js';
import Controller from './controllers/controller.js';

const initHTML = function () {
  // const stationLayout = new StationLayout();
  const controller = new Controller();
  app.append(managerContainer, sectionContainer);
  managerContainer.append(
    // stationElements.managerButton,
    controller.viewList.station.elements.managerButton,
    lineElements.managerButton,
    sectionElements.managerButton,
    mapPrintElements.managerButton,
  );
};

initHTML();

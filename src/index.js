import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainPageLayout.js';
import Controller from './controllers/controller.js';

const initHTML = function () {
  const controller = new Controller();
  app.append(managerContainer, sectionContainer);
  managerContainer.append(
    controller.viewList.station.elements.managerButton.$el,
    controller.viewList.line.elements.managerButton.$el,
    controller.viewList.section.elements.managerButton.$el,
    controller.viewList.mapPrint.elements.managerButton.$el,
  );
};

initHTML();

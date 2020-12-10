import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainLayout.js';
import { stationElements } from './layout/station.js';

const initHTML = function () {
  app.append(managerContainer, sectionContainer);
  managerContainer.append(stationElements.managerButton);
  stationElements.managerButton.addEventListener('click', handleStationManagerButton);
};

// TODO: html data 속성으로 page 동적으로 바꾸기
const handleStationManagerButton = function () {
  // TODO: 버튼을 누르면 역 바꾸기
  const section = sectionContainer.firstElementChild;
  if (!section) {
    sectionContainer.appendChild(stationElements.section);
  } else {
    section.replaceWith(stationElements.section);
  }
  console.log('station showed')

};

initHTML();

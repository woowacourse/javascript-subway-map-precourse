import Station from './station/station.js';
import Line from './line/line.js';
import { deleteStation } from './station/stationDataHandler.js';
import { deleteLine, updateLine } from './line/lineDataHandler.js';
import Subway from './subwayManagementSystem.js';
import { showSectionManager } from './section/sectionElemGenerator.js';
import { deleteStationFromLine } from './section/sectionDataHandler.js';

export const addEventToManagerBtn = () => {
  const managerButtons = document.querySelector('#manager-buttons');
  managerButtons.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    Subway.selectModule(event);
  });
};

export const addEventToCreateStationBtn = () => {
  const createStationBtn = document.querySelector('#station-add-button');
  createStationBtn.addEventListener('click', () => {
    Station.createStation();
  });
};

export const addEventToDeleteBtn = (listId) => {
  const tableBody = document.querySelector(listId);
  tableBody.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    if (listId === '#station-list') {
      return deleteStation(event);
    }
    if (listId === '#line-list') {
      return deleteLine(event);
    }
    return deleteStationFromLine(event);
  });
};

export const addEventToCreateLineBtn = () => {
  const createLineBtn = document.querySelector('#line-add-button');
  createLineBtn.addEventListener('click', () => {
    Line.createLine();
  });
};

export const addEventToLineNameBtn = () => {
  const lineNameBtns = document.querySelectorAll('.section-line-menu-button');
  lineNameBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => showSectionManager(event));
  });
};

export const addEventToCreateSectionBtn = () => {
  const createSectionBtn = document.querySelector('#section-add-button');
  createSectionBtn.addEventListener('click', updateLine);
};

export const addEventToDeleteSectionBtn = () => {
  const deleteBtns = document.querySelectorAll('.section-delete-button');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => deleteStationFromLine(event));
  });
};

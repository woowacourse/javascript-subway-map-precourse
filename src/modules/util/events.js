import Subway from '../subwayManager.js';
import { createStation, deleteStation } from '../station/stationDataHandler.js';
import { createLine, deleteLine } from '../line/lineDataHandler.js';
import { showSectionModuleLower } from '../section/sectionElemGenerator.js';
import {
  deleteStationFromLine,
  updateLine,
} from '../section/sectionDataHandler.js';

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
    createStation();
  });
};

export const addEventToDeleteBtn = (tagId) => {
  const tableBody = document.querySelector(tagId);
  tableBody.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    if (tagId === '#station-list') {
      return deleteStation(event);
    } else if (tagId === '#line-list') {
      return deleteLine(event);
    }
    return deleteStationFromLine(event);
  });
};

export const addEventToCreateLineBtn = () => {
  const createLineBtn = document.querySelector('#line-add-button');
  createLineBtn.addEventListener('click', () => {
    createLine();
  });
};

export const addEventToLineNameBtn = () => {
  const lineNameBtns = document.querySelectorAll('.section-line-menu-button');
  lineNameBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => showSectionModuleLower(event));
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

import { loadLineName, loadSectionStationData } from './sectionDataHandler.js';

import { deleteOption } from '../line/lineElemGenerator.js';
import { printSection } from '../util/output.js';
import { addEventToLineNameBtn } from '../util/events.js';

export const createLineNameBtn = (lineNames) => {
  const parentElem = document.querySelector('#parent');
  lineNames.forEach((lineName) => {
    let lineNameBtn = document.createElement('button');
    lineNameBtn.innerHTML = lineName;
    lineNameBtn.className = 'section-line-menu-button';
    lineNameBtn.dataset.line = lineName;
    parentElem.appendChild(lineNameBtn);
    lineNameBtn.insertAdjacentHTML('afterend', '<span class="space">&nbsp</span>');
  });
  addEventToLineNameBtn();
};

const deleteLineNameBtn = () => {
  const btnLists = document.querySelectorAll('.section-line-menu-button');
  const spaces = document.querySelectorAll('.space');
  if (btnLists) {
    btnLists.forEach((btn) => {
      btn.remove();
    });
  }
  if (spaces) {
    spaces.forEach((space) => {
      space.remove();
    });
  }
};

export const refreshSectionModule = () => {
  deleteLineNameBtn();
  loadLineName();
};

export const showSectionManager = (e) => {
  const line = e.target.dataset.line;
  const sectionManager = document.querySelector('#section-manager');
  if (document.querySelector('#title')) {
    clearTitle(document.querySelector('#title'));
  }
  const title = `<h3 id="title" data-line="${line}">${line} 관리</h3>`;
  sectionManager.insertAdjacentHTML('afterbegin', title);
  sectionManager.style.display = 'block';
  refreshSectionStationData();
  printSection(line);
};

export const hideSectionManager = () => {
  const sectionManager = document.querySelector('#section-manager');
  sectionManager.style.display = 'none';
};

export const clearTitle = (elem) => {
  elem.remove();
};

const refreshSectionStationData = () => {
  deleteOption();
  loadSectionStationData();
};

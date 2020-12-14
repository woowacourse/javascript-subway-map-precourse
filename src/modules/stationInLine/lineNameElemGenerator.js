import { loadLineName } from './stationInLineDataHandler.js';

export const makeLineNameBtn = (lineNames) => {
  const parentElem = document.querySelector('#section-module');
  lineNames.forEach((lineName) => {
    let lineNameBtn = document.createElement('button');
    lineNameBtn.innerHTML = lineName;
    lineNameBtn.className = 'section-line-menu-button';
    lineNameBtn.dataset.line = lineName;
    parentElem.appendChild(lineNameBtn);
    lineNameBtn.insertAdjacentHTML(
      'afterend',
      '<span class="space">&nbsp</span>'
    );
  });
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

export const refreshLineNameBtn = () => {
  deleteLineNameBtn();
  loadLineName();
};

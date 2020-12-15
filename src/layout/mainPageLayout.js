/**
 * 전반적인 페이지 골격에 관련된 변수와 함수 모음
 *
 */
export const app = document.querySelector('#app');
export const managerContainer = document.createElement('div');
export const sectionContainer = document.createElement('div');

const initElements = function () {
  managerContainer.id = 'manager-container';
  sectionContainer.id = 'section-container';
};

const appendNodesToDOM = function () {
  app.append(managerContainer, sectionContainer);
  sectionContainer.insertAdjacentHTML('afterbegin', '<section></section>');
};

const buildDefaultPage = function () {
  initElements();
  appendNodesToDOM();
};

buildDefaultPage();

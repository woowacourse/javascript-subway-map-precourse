/**
 * 기능 - 지하철 역 관리
 */

const stationManagerButton = document.createElement('button');
const stationSection = document.createElement('section');
// TODO: 내부에서만 쓰는 엘리먼트들을 전역변수에서 뺄 수 없을까?
const stationNameContainer = document.createElement('article');
const stationNameTitle = document.createElement('h3');
const stationNameInput = document.createElement('input');
const stationAddButton = document.createElement('button');

const stationResultContainer = document.createElement('article');
const stationResultTitle = document.createElement('h2');
const stationResultTable = document.createElement('table');

// TODO: 나중에 replace가 많이 쓰이면 common으로 뺄 것
const replaceSectionToStation = function (section) {
  section.replaceWith(stationSection);
};

// TODO: html data 속성으로 page 동적으로 바꾸기
const handleStationManagerButton = function () {
  const section = document.querySelector('#section-container > section');
  replaceSectionToStation(section);
  console.log('station showed');
};

const initElements = function () {
  stationSection.id = 'station-section';
  stationManagerButton.id = 'station-manager-button';
  stationManagerButton.innerHTML = '1. 역 관리';
  stationNameTitle.innerHTML = '역 이름';
  stationNameInput.id = 'station-name-input';
  stationNameInput.placeholder = '역 이름을 입력해주세요.';
  stationAddButton.id = 'station-add-button';
  stationAddButton.innerHTML = '역 추가';
  stationResultTitle.innerHTML = '🚉 지하철 역 목록';
  stationManagerButton.addEventListener('click', handleStationManagerButton);
};

const appendNodesToDOM = function () {
  stationSection.append(stationNameContainer, stationResultContainer);
  stationNameContainer.append(
    stationNameTitle,
    stationNameInput,
    stationAddButton,
  );
  stationResultContainer.append(stationResultTitle, stationResultTable);
};

const buildStationSection = function () {
  initElements();
  appendNodesToDOM();
  console.log('station section build');
};

buildStationSection();

// eslint-disable-next-line import/prefer-default-export
export const stationElements = {
  managerButton: stationManagerButton,
  section: stationSection,
};

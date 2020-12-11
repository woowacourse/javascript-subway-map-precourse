/**
 * 지하철 노선 관련 모듈
 */

// 외부에 노출되는 변수
const lineManagerButton = document.createElement('button');
const lineSection = document.createElement('section');

// 내부 변수
const lineNameContainer = document.createElement('article');
const lineNameInput = document.createElement('input');
const lineStartStationSector = document.createElement('select');
const lineEndStationSector = document.createElement('select');
const lineAddButton = document.createElement('button');

const lineResultContainer = document.createElement('article');
const lineResultTable = document.createElement('tb');

const replaceSectionToLine = function (section) {
  section.replaceWith(lineSection);
};

const handleLineManagerButton = function () {
  const section = document.querySelector('#section-container > section');
  replaceSectionToLine(section);
  console.log('line showed');
};

const initElements = function () {
  lineManagerButton.id = 'line-manager-button';
  lineSection.id = 'line-section';
  lineManagerButton.innerHTML = '2. 노선 관리';
  lineManagerButton.addEventListener('click', handleLineManagerButton);

  lineNameInput.id = 'line-name-input';
  lineNameInput.placeholder = '노선 이름을 입력해주세요';

  lineStartStationSector.id = ' line-start-station-selector';
  lineEndStationSector.id = 'line-end-station-selector';

  lineAddButton.id = 'line-add-button';
  lineAddButton.innerHTML = '노선 추가';
};

const appendNodesToDOM = function () {
  lineSection.append(lineNameContainer, lineResultContainer);
  lineNameContainer.append(
    lineNameInput,
    lineStartStationSector,
    lineEndStationSector,
    lineAddButton,
  );
  lineNameInput.insertAdjacentHTML('beforebegin', '<h3>노선 이름</h3>');
  lineStartStationSector.insertAdjacentHTML(
    'beforebegin',
    '<h3>상행 종점</h3>',
  );
  lineEndStationSector.insertAdjacentHTML('beforebegin', '<h3>하행 종점</h3>');
  lineResultContainer.append(lineResultTable);
  lineResultContainer.insertAdjacentHTML(
    'afterbegin',
    '<h2>🚉 지하철 노선 목록</h2>',
  );
};

const buildLineSection = function () {
  initElements();
  appendNodesToDOM();
  console.log('line section build');
};

buildLineSection();

export const lineElements = {
  managerButton: lineManagerButton,
  section: lineSection,
};

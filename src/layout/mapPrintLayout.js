/**
 * 지하철 노선도 출력과 관련된 레이아웃을 관리하는 모듈
 */

const mapPrintManagerButton = document.createElement('button');
const mapPrintSection = document.createElement('section');
// TODO: 내부에서만 쓰는 엘리먼트들을 전역변수에서 뺄 수 없을까?

const mapPrintResultContainer = document.createElement('div');
const mapPrintContainer = document.createElement('div');

// TODO: 나중에 replace가 많이 쓰이면 common으로 뺄 것
const showPageInsteadOf = function (section) {
  section.replaceWith(mapPrintSection);
};

// TODO: html data 속성으로 page 동적으로 바꾸기
const handlemapPrintManagerButton = function () {
  const section = document.querySelector('#section-container > section');
  showPageInsteadOf(section);
  console.log('mapPrint showed');
};

const initElements = function () {
  mapPrintManagerButton.id = 'map-print-manager-button';
  mapPrintManagerButton.innerHTML = '4. 지하철 노선도 출력';
  mapPrintManagerButton.addEventListener('click', handlemapPrintManagerButton);
  mapPrintContainer.className = 'map';
};

const appendNodesToDOM = function () {
  mapPrintSection.append(mapPrintResultContainer);
  mapPrintResultContainer.append(mapPrintContainer); //노선 개수만큼 append
  mapPrintContainer.insertAdjacentHTML('afterbegin', '<h2>n호선</h2>');
  mapPrintContainer.insertAdjacentHTML('beforeend', '<ul><li>인천</li></ul>');
};

const buildMapPrintSection = function () {
  initElements();
  appendNodesToDOM();
  console.log('MapPrint section build');
};

buildMapPrintSection();

// eslint-disable-next-line import/prefer-default-export
export const mapPrintElements = {
  managerButton: mapPrintManagerButton,
  section: mapPrintSection,
};

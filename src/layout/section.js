/**
 * 지하철 노선 관련 모듈
 */

// 외부에 노출되는 변수
const sectionManagerButton = document.createElement('button');
const sectionSection = document.createElement('section');

// 내부 변수
const sectionLineMenuButtonContainer = document.createElement('div');
const sectionOrderContainer = document.createElement('div');
const sectionStationSelector = document.createElement('select');
const sectionOrderInput = document.createElement('input');
const sectionAddButton = document.createElement('button');
const sectionResultContainer = document.createElement('div');

const showPageInsteadOf = function (section) {
  section.replaceWith(sectionSection);
};

const handleSectionManagerButton = function () {
  const section = document.querySelector('#section-container > section');
  showPageInsteadOf(section);
  console.log('section showed');
};

const initElements = function () {
  sectionManagerButton.id = 'section-manager-button';
  sectionManagerButton.innerHTML = '3. 구간 관리';
  sectionManagerButton.addEventListener('click', handleSectionManagerButton);
  sectionSection.id = 'section-section';
  sectionOrderInput.id = 'section-order-input';
  sectionOrderInput.placeholder = '순서';
  sectionAddButton.id = 'section-add-button';
  sectionAddButton.innerHTML = '등록';
};

const appendNodesToDOM = function () {
  sectionSection.append(
    sectionLineMenuButtonContainer,
    sectionOrderContainer,
    sectionResultContainer,
  );
  sectionOrderContainer.append(
    sectionStationSelector,
    sectionOrderInput,
    sectionAddButton,
  );

  sectionLineMenuButtonContainer.insertAdjacentHTML(
    'beforebegin',
    '<h3>구간을 수정할 노선을 선택해주세요.</h3>',
  );
  sectionOrderContainer.insertAdjacentHTML(
    'beforebegin',
    '<h3>n호선 관리</h3>',
  );
  sectionOrderContainer.insertAdjacentHTML('afterbegin', '<h4>구간 등록</h4>');
};

const buildSectionSection = function () {
  initElements();
  appendNodesToDOM();
  console.log('section section build');
};

buildSectionSection();

export const sectionElements = {
  managerButton: sectionManagerButton,
  section: sectionSection,
};

import updateSectionList from './updateSectionList.js';
import renderSubwayMap from '../../render/station-map/renderSubwayMap.js';

const MINIMUM_IN_LINE_SECTION = 2;

function removeSection(targetLine, lineNumber) {
  const lineList = JSON.parse(localStorage.getItem('lines')).split(',');

  lineList[lineNumber] = targetLine.join(' ');
  localStorage.setItem('lines', JSON.stringify(lineList.join(',')));
  updateSectionList(lineNumber);
  renderSubwayMap();
}

function findTargetLine(target) {
  const targetLineNumber = target.closest('.section-container').dataset.number;
  return JSON.parse(localStorage.getItem('lines')).split(',')[targetLineNumber];
}

function checkDeleteSection(target) {
  const targetLine = findTargetLine(target);

  if (targetLine.split(' ').length - 1 <= MINIMUM_IN_LINE_SECTION) {
    return alert(
      `최소 ${MINIMUM_IN_LINE_SECTION}개 이상의 역이 노선에 존재해야 합니다.`,
    );
  }
  const targetLineList = targetLine.split(' ');
  targetLineList.splice(Number(target.dataset.number), 1);
  return removeSection(
    targetLineList,
    target.closest('.section-container').dataset.number,
  );
}

export default function removeSectionEvent() {
  const $sectionDeleteButton = document.querySelectorAll(
    '.section-delete-button',
  );

  $sectionDeleteButton.forEach((button) =>
    button.addEventListener('click', ({ target }) => {
      if (window.confirm('정말로 노선에서 삭제하시겠습니까?')) {
        checkDeleteSection(target);
      }
    }),
  );
}

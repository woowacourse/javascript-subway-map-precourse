import { notDuplicateLine } from '../controllers/validation.js';
import { clearFocus } from '../views/utils.js';
import { showAddedLine } from '../views/lineManager.js';

const lineNameInput = document.querySelector('#line-name-input');
const lineStartSelector = document.querySelector('#line-start-station-selector');
const lineEndSelector = document.querySelector('#line-end-station-selector');
const lineAddBtn = document.querySelector('#line-add-button');

export const lineAddListener = subwayMap => {
  lineAddBtn.addEventListener('click', () =>
    addNewLine(lineNameInput.value, lineStartSelector.value, lineEndSelector.value, subwayMap)
  );
  lineNameInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      addNewLine(lineNameInput.value, lineStartSelector.value, lineEndSelector.value, subwayMap);
    }
  });
};

const addNewLine = (name, start, end, subwayMap) => {
  if (notDuplicateLine(name.trim(), subwayMap.lineList) && name.trim() !== '') {
    if (start !== end) {
      subwayMap.addLine(name.trim(), start, end);
      showAddedLine(subwayMap);
    } else {
      alert('상행 종점과 하행 종점이 같습니다.');
    }
  } else {
    alert('잘못된 값입니다. 다시 입력해주세요.');
  }
  clearFocus(lineNameInput);
};

export const deleteLine = (name, subwayMap) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    subwayMap.delLine(name);
    showAddedLine(subwayMap);
  }
};

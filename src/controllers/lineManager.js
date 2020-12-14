import { notDuplicateLine } from '../controllers/validation.js';
import { clearFocus } from '../views/utils.js';

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
  if (notDuplicateLine(name, subwayMap.lineList) && start !== end) {
    // subwayMap.addStation(name);
    // showAddedStation(subwayMap);
  } else {
    alert('잘못된 값입니다. 다시 입력해주세요.');
  }
  clearFocus(lineNameInput);
};

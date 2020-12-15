import { geTwo, notDuplicateStation, stationNotInLine } from '../controllers/validation.js';
import { showAddedStation } from '../views/stationManager.js';
import { clearFocus } from '../views/utils.js';

const stationNameInput = document.querySelector('#station-name-input');
const stationAddBtn = document.querySelector('#station-add-button');

export const stationAddListener = subwayMap => {
  stationAddBtn.addEventListener('click', () => addNewStation(stationNameInput.value, subwayMap));
  stationNameInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      addNewStation(stationNameInput.value, subwayMap);
    }
  });
};

const addNewStation = (name, subwayMap) => {
  if (geTwo(name) && notDuplicateStation(name, subwayMap.stationList)) {
    subwayMap.addStation(name);
    showAddedStation(subwayMap);
  } else {
    alert('잘못된 값입니다. 다시 입력해주세요.');
  }
  clearFocus(stationNameInput);
};

export const deleteStation = (name, subwayMap) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    if (stationNotInLine(name, subwayMap.lineList)) {
      subwayMap.delStation(name);
      showAddedStation(subwayMap);
    } else {
      alert('노선에 포함된 역입니다.');
    }
  }
};

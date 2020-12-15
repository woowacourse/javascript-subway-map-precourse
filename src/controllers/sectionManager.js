import { notFirstOrLast, stationNotInSelectedLine } from './validation.js';
import { clearFocus } from '../views/utils.js';
import { showAddedSection } from '../views/sectionManager.js';

export const changeAddListener = (selectedLineName, subwayMap) => {
  const sectionStationSelector = document.querySelector('#section-station-selector');
  const sectionOrderInput = document.querySelector('#section-order-input');
  const sectionAddBtn = document.querySelector('#section-add-button');
  sectionAddBtn.addEventListener('click', () =>
    addNewSection(
      sectionStationSelector.value,
      sectionOrderInput.value,
      selectedLineName,
      subwayMap
    )
  );
  sectionOrderInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      addNewSection(
        sectionStationSelector.value,
        sectionOrderInput.value,
        selectedLineName,
        subwayMap
      );
    }
  });
};

export const sectionRemoveListener = () => {
  const sectionOrderInput = document.querySelector('#section-order-input');
  sectionAddBtn.removeEventListener();
  sectionOrderInput.removeEventListener();
};

const addNewSection = (station, order, selectedLineName, subwayMap) => {
  const sectionOrderInput = document.querySelector('#section-order-input');
  const lineList = subwayMap.lineList;
  let sectionIndex = lineList.findIndex(line => line.name === selectedLineName);
  const selectedLine = lineList[sectionIndex].list;
  if (notFirstOrLast(order, selectedLine) && stationNotInSelectedLine(station, selectedLine)) {
    subwayMap.addSection(sectionIndex, order, station);
    showAddedSection(selectedLineName, subwayMap);
  } else {
    alert('잘못된 값입니다. 다시 입력해주세요.');
  }
  clearFocus(sectionOrderInput);
};

export const deleteSection = (lineName, stationName, subwayMap) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    subwayMap.delSection(lineName, stationName);
    showAddedSection(lineName, subwayMap);
  }
};

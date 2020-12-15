import { notFirstOrLast, stationNotInSelectedLine, gtTwo } from './validation.js';
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
  const sectionIndex = lineList.findIndex(line => line.name === selectedLineName);
  const selectedLine = lineList[sectionIndex].list;
  if (notFirstOrLast(order, selectedLine)) {
    if (stationNotInSelectedLine(station, selectedLine)) {
      subwayMap.addSection(sectionIndex, order, station);
      showAddedSection(selectedLineName, subwayMap);
    } else {
      alert('이미 노선에 존재하는 역입니다.');
    }
  } else {
    alert('그 순서에 역을 추가할 수 없습니다.');
  }
  clearFocus(sectionOrderInput);
};

export const deleteSection = (lineName, stationName, subwayMap) => {
  const lineList = subwayMap.lineList;
  const sectionIndex = lineList.findIndex(line => line.name === lineName);
  const selectedLineList = lineList[sectionIndex].list;
  if (gtTwo(selectedLineList)) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      subwayMap.delSection(lineName, stationName);
      showAddedSection(lineName, subwayMap);
    }
  } else {
    alert('노선에 2개 이상의 역이 존재해야 합니다.');
  }
};

import {
  $lineNameInput,
  $upStreamSelector,
  $downStreamSelector,
} from '../View/element.js';
import {
  addLineScreen,
  addMapPrint,
  addSectionButton,
  addSectionScreen,
  addStationSelectOption,
} from '../View/add-screen.js';
import {
  removeLineScreen,
  removeSectionButton,
  removeMapPrint,
} from '../View/remove-screen.js';
import {hideSectionEditContainer} from '../View/hide-screen.js';
import {setLocalStorage, removeLocalStorage} from './local-storage.js';
import {stationInstance, lineInstance} from '../index.js';
import {isLineInputValid} from './valid.js';
import {KEY} from './utils.js';

export function onAddLine() {
  const lineValue = getLineValue();
  if (isLineInputValid(lineValue, lineInstance.lines)) {
    setLocalStorage(KEY.LINE, lineValue);
    lineInstance.addLine(lineValue);
    addLineScreen(lineValue);
    addSectionButton(lineValue.lineName);
    addSectionScreen(lineValue);
    addMapPrint([lineValue]);
  }
  $lineNameInput.value = '';
}

export function onRemoveLine(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  if (removeConfirm) {
    removeLocalStorage(KEY.LINE, e.target.dataset.line);
    lineInstance.removeLine(e.target.dataset.line);
    removeLineScreen(e.target);
    removeSectionButton(e.target.dataset.line);
    removeMapPrint(e.target.dataset.line);
    hideSectionEditContainer();
  }
}

export const loadLine = () => {
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) => {
    addStationSelectOption($upStreamSelector, station);
    addStationSelectOption($downStreamSelector, station);
  });
  lineInstance.lines.forEach((line) => {
    addLineScreen(line);
  });
};

const getLineValue = () => {
  return {
    lineName: $lineNameInput.value,
    station: [$upStreamSelector.value, $downStreamSelector.value],
  };
};

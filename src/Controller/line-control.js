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
  addSelectorOption,
} from '../View/add-screen.js';
import {
  removeLineScreen,
  removeSectionButton,
  removeSectionScreen,
  removeMapPrint,
} from '../View/remove-screen.js';
import {hideSectionEditContainer} from '../View/hide-screen.js';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './local-storage.js';
import {stationInstance, lineInstance} from '../index.js';
import {isLineInputValid} from './valid.js';
import {KEY, TEXT} from './constant.js';

export const onAddLine = () => {
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
};

export function onRemoveLine(e) {
  const removeConfirm = confirm(TEXT.CONFIRM_DELETE);
  if (removeConfirm) {
    removeLocalStorage(KEY.LINE, e.target.dataset.lineName);
    lineInstance.removeLine(e.target.dataset.lineName);
    removeLineScreen(e.target);
    removeSectionButton(e.target.dataset.lineName);
    removeSectionScreen(e.target.dataset.lineName);
    removeMapPrint(e.target.dataset.lineName);
    hideSectionEditContainer();
  }
}

export const loadLine = () => {
  const lines = getLocalStorage(KEY.LINE);
  lineInstance.loadLine(lines);
  stationInstance.stations.forEach((station) => {
    addSelectorOption($upStreamSelector, station);
    addSelectorOption($downStreamSelector, station);
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

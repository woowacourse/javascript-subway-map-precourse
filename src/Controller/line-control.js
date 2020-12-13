import {
  $lineNameInput,
  $lineContainer,
  $upStreamOption,
  $downStreamOption,
  $upStream,
  $downStream,
} from '../View/element.js';
import {addLineScreen, addStationSelectOption} from '../View/add-screen.js';
import {
  removeLineScreen,
  removeTableScreen,
  removeOption,
} from '../View/remove-screen.js';
import {setLocalStorage, removeLocalStorage} from './local-storage.js';
import {stationInstance, lineInstance} from '../index.js';
import {isLineInputValid} from './valid.js';

export function onAddLine() {
  const lineValue = getLineValue();
  if (isLineInputValid(lineValue, lineInstance.lines)) {
    setLocalStorage('line', lineValue);
    lineInstance.addLine(lineValue);
    addLineScreen(lineValue);
  }
  $lineNameInput.value = '';
}

export function onRemoveLine(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  if (removeConfirm) {
    removeLocalStorage('line', e.target.dataset.line);
    lineInstance.removeLine(e.target.dataset.line);
    removeLineScreen(e.target);
  }
}

export const loadLine = () => {
  removeTableScreen($lineContainer);
  removeOption($upStreamOption);
  removeOption($downStreamOption);
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) => {
    addStationSelectOption($upStream, station);
    addStationSelectOption($downStream, station);
  });
  lineInstance.lines.forEach((line) => {
    addLineScreen(line);
  });
};

const getLineValue = () => {
  return {
    lineName: $lineNameInput.value,
    station: [$upStream.value, $downStream.value],
  };
};

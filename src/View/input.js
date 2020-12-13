import {onChangeScreen} from '../index.js';
import {onAddStation, onRemoveStation} from '../Controller/station-control.js';
import {onAddLine, onRemoveLine} from '../Controller/line-control.js';
import {
  onAddSection,
  onRemoveSection,
  onLoadSection,
} from '../Controller/section-control.js';
import {
  $screenButton,
  $stationAddButton,
  $lineAddButton,
  $sectionAddButton,
} from './element.js';

export const setButtonOption = (value, button) => {
  if (button.className === 'station-delete-button') {
    button.dataset.station = value;
    return button.addEventListener('click', onRemoveStation);
  }
  if (button.className === 'line-delete-button') {
    button.dataset.line = value;
    return button.addEventListener('click', onRemoveLine);
  }
  if (button.className === 'section-line-menu-button') {
    button.dataset.line = value;
    return button.addEventListener('click', onLoadSection);
  }
  if (button.className === 'section-delete-button') {
    button.dataset.sectionLine = JSON.stringify(value);
    return button.addEventListener('click', onRemoveSection);
  }
};

$screenButton.forEach((button) =>
  button.addEventListener('click', onChangeScreen),
);

$stationAddButton.addEventListener('click', onAddStation);

$lineAddButton.addEventListener('click', onAddLine);

$sectionAddButton.addEventListener('click', onAddSection);

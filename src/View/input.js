import {onChangeScreen} from '../index.js';
import {onAddStation, onRemoveStation} from '../Controller/station-control.js';
import {onAddLine, onRemoveLine} from '../Controller/line-control.js';
import {
  onAddSection,
  onRemoveSection,
  onLoadSection,
} from '../Controller/section-control.js';
import {
  $screenAllButton,
  $stationAddButton,
  $lineAddButton,
  $sectionAddButton,
} from './element.js';

export const setStationDeleteButton = (station, $button) => {
  $button.dataset.stationName = station;
  $button.addEventListener('click', onRemoveStation);
};

export const setLineDeleteButton = (line, $button) => {
  $button.dataset.lineName = line;
  $button.addEventListener('click', onRemoveLine);
};

export const setSectionDeleteButton = (line, $button) => {
  $button.dataset.sectionLine = JSON.stringify(line);
  $button.addEventListener('click', onRemoveSection);
};

export const setSectionLoadButton = (line, $button) => {
  $button.dataset.lineName = line;
  $button.addEventListener('click', onLoadSection);
};

$screenAllButton.forEach((button) =>
  button.addEventListener('click', onChangeScreen),
);

$stationAddButton.addEventListener('click', onAddStation);

$lineAddButton.addEventListener('click', onAddLine);

$sectionAddButton.addEventListener('click', onAddSection);

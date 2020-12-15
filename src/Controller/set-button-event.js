import {
  $stationTbody,
  $lineTbody,
  $sectionEditButtonContainer,
  $sectionTbody,
} from '../View/element.js';
import {onRemoveStation} from './station-control.js';
import {onRemoveLine} from './line-control.js';
import {onLoadSection, onRemoveSection} from './section-control.js';

export const setStationButtonDeleteEvent = (stationName) => {
  const $button = $stationTbody.querySelector(
    `[data-station-name='${stationName}']`,
  );
  $button.addEventListener('click', onRemoveStation);
};

export const setLineButtonDeleteEvent = (lineName) => {
  const $button = $lineTbody.querySelector(`[data-line-name='${lineName}']`);
  $button.addEventListener('click', onRemoveLine);
};

export const setSectionButtonLoadEvent = (lineName) => {
  const $button = $sectionEditButtonContainer.querySelector(
    `[data-line-name='${lineName}']`,
  );
  $button.addEventListener('click', onLoadSection);
};

export const setSectionButtonDeleteEvent = (line) => {
  const $lineAllTr = $sectionTbody.querySelectorAll(
    `[data-line-name='${line.lineName}']`,
  );

  return $lineAllTr.forEach(($tr) => {
    $tr.querySelector('button').addEventListener('click', onRemoveSection);
  });
};

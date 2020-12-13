import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $mapContainer,
} from './element.js';

export const removeStationScreen = (button) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = button.parentElement.parentElement;
  $stationTbody.removeChild($stationTr);
};

export const removeStationSelectOption = ($stationSelect, station) => {
  const $stationSelectOptions = $stationSelect.querySelectorAll('option');
  const removedStationOption = Array.from($stationSelectOptions).find(
    (option) => option.value === station,
  );
  $stationSelect.removeChild(removedStationOption);
};

export const removeLineScreen = (button) => {
  const $lineTbody = $lineContainer.querySelector('table > tbody');
  const $lineTr = button.parentElement.parentElement;
  $lineTbody.removeChild($lineTr);
};

export const removeTableScreen = ($container) => {
  const $tbody = $container.querySelector('table > tbody');
  const $tr = $container.querySelectorAll('tr');
  for (let i = 1; i < $tr.length; i++) {
    $tbody.removeChild($tr[i]);
  }
};

export const removeSectionButton = () => {
  const $sectionButtonContainer = $sectionContainer.querySelector(
    '#section-select-button',
  );
  while ($sectionButtonContainer.firstChild) {
    $sectionButtonContainer.removeChild($sectionButtonContainer.firstChild);
  }
};

export const removeOption = ($select) => {
  while ($select.firstChild) {
    $select.removeChild($select.firstChild);
  }
};

export const removeMapPrint = () => {
  while ($mapContainer.firstChild) {
    $mapContainer.removeChild($mapContainer.firstChild);
  }
};

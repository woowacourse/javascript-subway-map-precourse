import {$stationContainer, $lineContainer, $sectionContainer} from './input.js';

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

export const removeSectionLine = () => {
  const $sectionTbody = $sectionContainer.querySelector('table > tbody');
  const $sectionLines = $sectionContainer.querySelectorAll('tr');
  for (let i = 1; i < $sectionLines.length; i++) {
    $sectionTbody.removeChild($sectionLines[i]);
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

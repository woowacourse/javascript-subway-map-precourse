import {$stationContainer, $lineContainer} from './input.js';

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

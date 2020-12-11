import {$stationContainer} from './input.js';

export const removeStationScreen = (button) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = button.parentElement.parentElement;
  $stationTbody.removeChild($stationTr);
};

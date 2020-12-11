import {$stationContainer, $downStream, $upStream} from './input.js';

export const removeStationScreen = (button) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = button.parentElement.parentElement;
  $stationTbody.removeChild($stationTr);
};

export const removeLastStopScreen = (station) => {
  const $upStreamOptions = $upStream.querySelectorAll('option');
  const $downStreamOptions = $downStream.querySelectorAll('option');
  const removedUpStreamOption = Array.from($upStreamOptions).find(
    (option) => option.value === station,
  );
  const removedDownStreamOption = Array.from($downStreamOptions).find(
    (option) => option.value === station,
  );
  $upStream.removeChild(removedUpStreamOption);
  $downStream.removeChild(removedDownStreamOption);
};

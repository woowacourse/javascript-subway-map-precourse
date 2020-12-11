import {$stationContainer, setStationButton} from './input.js';

export const addStationScreen = (value) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = document.createElement('tr');
  $stationTr.innerHTML = `
    <td>${value}</td>
    <td><button>삭제</button></td>
  `;
  setStationButton(value, $stationTr.querySelector('button'));
  $stationTbody.appendChild($stationTr);
};

export const addLastStopScreen = (station) => {
  const $upStream = document.body.querySelector('#line-start-station-selector');
  const $downStream = document.body.querySelector('#line-end-station-selector');
  const $optionUpStreamStation = document.createElement('option');
  const $optionDownStreamStation = document.createElement('option');
  $optionUpStreamStation.textContent = station;
  $optionDownStreamStation.textContent = station;
  $upStream.appendChild($optionUpStreamStation);
  $downStream.appendChild($optionDownStreamStation);
};

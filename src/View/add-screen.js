import {$stationContainer, $lineContainer, setButtonOption} from './input.js';

export const addStationScreen = (value) => {
  const $stationTbody = $stationContainer.querySelector('table > tbody');
  const $stationTr = document.createElement('tr');
  $stationTr.innerHTML = `
    <td>${value}</td>
    <td><button class="station-delete-button">삭제</button></td>
  `;
  setButtonOption(value, $stationTr.querySelector('button'));
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

export const addLineScreen = (line) => {
  const $lineTbody = $lineContainer.querySelector('table > tbody');
  const $lineTr = document.createElement('tr');
  $lineTr.innerHTML = `
    <td>${line.lineName}</td>
    <td>${line.upStream}</td>
    <td>${line.downStream}</td>
    <td><button class="line-delete-button">삭제</button></td>
  `;
  setButtonOption(line.lineName, $lineTr.querySelector('button'));
  $lineTbody.appendChild($lineTr);
};

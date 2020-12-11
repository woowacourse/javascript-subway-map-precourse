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

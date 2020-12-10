import setState from '../setState.js';

export default function stationManagerEvent() {
  const $stationAddButton = document.querySelector('#station-add-button');

  $stationAddButton.addEventListener('click', () => setState('addStation'));
}

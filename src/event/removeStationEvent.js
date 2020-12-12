import render from '../render/render.js';

function removeStation(stationName) {
  const stations = JSON.parse(String(localStorage.getItem('stations')));
  const stationList = stations.split(' ');

  stationList.splice(stationList.indexOf(stationName), 1);
  localStorage.setItem('stations', JSON.stringify(stationList.join(' ')));

  render();
}

function findRemoveTarget(target) {
  const $stationTable = document.querySelectorAll('.station-table-child');
  const targetNumber = target.closest('td').dataset.number;

  removeStation($stationTable[targetNumber].querySelector('span').innerText);
}

export default function removeStationEvent() {
  const $stationDeleteButton = document.querySelectorAll(
    '.station-delete-button',
  );

  $stationDeleteButton.forEach((button) =>
    button.addEventListener('click', ({ target }) => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        findRemoveTarget(target);
      }
    }),
  );
}

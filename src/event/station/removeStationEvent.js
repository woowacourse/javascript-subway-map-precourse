import renderStationList from '../../render/station/renderStationList.js';

function removeStation(stationName) {
  const stations = JSON.parse(String(localStorage.getItem('stations')));
  const stationList = stations.split(' ');

  stationList.splice(stationList.indexOf(stationName), 1);

  localStorage.setItem('stations', JSON.stringify(stationList.join(' ')));
  if (!stationList.length) {
    localStorage.removeItem('stations');
  }

  renderStationList();
}

function checkIncludeLine(stationName) {
  const lines = JSON.parse(localStorage.getItem('lines'));
  const lineList = lines.split(',');
  const includeLineStation = new Set(
    lineList.map((line) => line.split(' ').splice(1)).flat(),
  );

  if ([...includeLineStation].includes(stationName)) {
    return alert('노선에 등록된 역은 삭제할 수 없습니다.');
  }
  return removeStation(stationName);
}

function findRemoveTarget(target) {
  const $stationTable = document.querySelectorAll('.station-table-child');
  const targetNumber = target.closest('td').dataset.number;

  checkIncludeLine($stationTable[targetNumber].querySelector('span').innerText);
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

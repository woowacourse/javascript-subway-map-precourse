// import render from '../render.js';

const MINIMUN_STATION_LENGTH = 2;

function checkValidStationName(stationName, stations) {
  if (stationName.length < MINIMUN_STATION_LENGTH) {
    return alert(`역 이름은 ${MINIMUN_STATION_LENGTH}글자 이상이어야 합니다.`);
  }
  if (stations.split(' ').includes(stationName)) {
    return alert('이미 존재하는 역 이름은 입력할 수 없습니다.');
  }

  return true;
}

function addStation() {
  const inputStationName = document.querySelector('#station-name-input').value;
  const stations = JSON.parse(localStorage.getItem('stations'));

  if (!checkValidStationName(inputStationName, String(stations))) {
    return false;
  }
  if (!stations) {
    return localStorage.setItem('stations', JSON.stringify(inputStationName));
  }
  return localStorage.setItem(
    'stations',
    JSON.stringify(`${stations} ${inputStationName}`),
  );
}

export default function stationManagerEvent() {
  const $stationAddButton = document.querySelector('#station-add-button');

  $stationAddButton.addEventListener('click', addStation);
}

import render from '../../render/render.js';

const MINIMUN_STATION_LENGTH = 2;

function addStation(inputStationName, stations) {
  if (!stations) {
    return localStorage.setItem('stations', JSON.stringify(inputStationName));
  }
  return localStorage.setItem('stations', JSON.stringify(`${stations} ${inputStationName}`));
}

function checkValidStationName() {
  const inputStationName = document.querySelector('#station-name-input').value;
  const stations = JSON.parse(localStorage.getItem('stations'));

  if (inputStationName.length < MINIMUN_STATION_LENGTH) {
    return alert(`역 이름은 ${MINIMUN_STATION_LENGTH}글자 이상이어야 합니다.`);
  }
  if (stations === null) {
    return addStation(inputStationName, stations);
  }
  if (stations.split(' ').includes(inputStationName)) {
    return alert('이미 존재하는 역 이름은 입력할 수 없습니다.');
  }
  return addStation(inputStationName, stations);
}

export default function addStationEvent() {
  const $stationAddButton = document.querySelector('#station-add-button');

  $stationAddButton.addEventListener('click', () => {
    checkValidStationName();
    render();
  });
}

import { STATION_MANAGER_PAGE_TEMPLATE, STATION_TABLE_TEMPLATE } from '../utils/templete.js';
import stationStorage from '../utils/stationStorage.js';
import Station from '../utils/Station.js';

export default function stationManagerPage($element) {
  $element.innerHTML = STATION_MANAGER_PAGE_TEMPLATE;
  const $userStationInput = $element.querySelector('#station-name-input');
  const $userStationSubmit = $element.querySelector('#station-add-button');
  const $stationTablebody = $element.querySelector('.station_manager_tbody');

  let stations = stationStorage().getStation();

  const stationNameValidator = (stationName) => {
    if (stationName.length < 2) {
      return alert('이름은 두글자 이상입니다');
    }
    if (stations && stations.map((value) => value.name).includes(stationName)) {
      return alert('중복된 이름입니다.');
    }

    return true;
  };

  const showStations = () => {
    $stationTablebody.innerHTML = stations.map(STATION_TABLE_TEMPLATE).join('');
  };

  const deleteStation = (stationTag) => {
    if (stationTag.dataset.lines.length !== 0) {
      return alert('노선에 포함되어 있는 라인은 삭제할 수 없습니다');
    }
    stations = stations.filter((station) => station.id !== parseInt(stationTag.id));
    stationStorage().setStation(stations);
    showStations();
  };

  const onStationDeleteHandler = (e) => {
    if (!e.target.classList.contains('station-delete-button')) {
      return false;
    }
    deleteStation(e.target.closest('tr'));
  };

  const getNewId = () => {
    if (!stations || stations.length === 0) {
      return 0;
    }
    return stations[stations.length - 1].id + 1;
  };

  const createStation = (newStationName) => {
    stations.push(new Station(getNewId(), newStationName));
    stationStorage().setStation(stations);
    showStations();
  };

  const onStationSubmitHandler = () => {
    const newStationName = $userStationInput.value;
    if (stationNameValidator(newStationName)) {
      createStation(newStationName);
    }
    $userStationInput.value = '';
  };

  $userStationSubmit.addEventListener('click', onStationSubmitHandler);
  $stationTablebody.addEventListener('click', onStationDeleteHandler);
  showStations();
}

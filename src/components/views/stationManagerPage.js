import {
  STATION_MANAGER_PAGE_TEMPLATE,
  STATION_TABLE_TEMPLATE,
} from '../template/stationManagerTemplate.js';
import {
  stationNameValidator,
  stationDeleteValidation,
} from '../../utils/validator/stationValidator.js';
import stationStorage from '../../storage/stationStorage.js';
import Station from '../../utils/Station.js';

export default function stationManagerPage($element) {
  $element.innerHTML = STATION_MANAGER_PAGE_TEMPLATE;
  const $userStationInput = $element.querySelector('#station-name-input');
  const $userStationSubmit = $element.querySelector('#station-add-button');
  const $stationTableBody = $element.querySelector('.station_manager_tbody');

  let stations = stationStorage().getStations();

  const renderStationTable = () => {
    $stationTableBody.innerHTML = stations.map(STATION_TABLE_TEMPLATE).join('');
  };

  const deleteStation = (stationTag) => {
    if (!stationDeleteValidation(stationTag)) {
      return;
    }
    stations = stations.filter((station) => station.id !== parseInt(stationTag.id));
    stationStorage().setStation(stations);
    renderStationTable();
  };

  const onStationDeleteHandler = (e) => {
    if (!e.target.classList.contains('station-delete-button')) {
      return false;
    }
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteStation(e.target.closest('tr'));
    }
  };

  const addStations = (newStations) => {
    stations.push(newStations);
    stationStorage().setStation(stations);
    renderStationTable();
  };

  const getNewId = () => {
    if (!stations || stations.length === 0) {
      return 0;
    }
    return stations[stations.length - 1].id + 1;
  };

  const createStation = (newStationName) => {
    addStations(new Station(getNewId(), newStationName));
  };

  const onStationSubmitHandler = () => {
    const newStationName = $userStationInput.value;
    if (stationNameValidator(stations, newStationName)) {
      createStation(newStationName);
    }
    $userStationInput.value = '';
  };

  $userStationSubmit.addEventListener('click', onStationSubmitHandler);
  $stationTableBody.addEventListener('click', onStationDeleteHandler);
  renderStationTable();
}

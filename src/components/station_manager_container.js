import { stationAddContainer, stationList } from '../templates/index.js';
import { isValidStationName } from '../utils/index.js';

export default function StationManagerContainer({ addStation, getStations }) {
  this.mainContainer = document.querySelector('.main-container');
  this.stationAddButton = document.getElementById('station-add-button');

  this.setEventListner = () => {};

  this.handleClickMainConatiner = ({ target: { id } }) => {
    if (id !== 'station-add-button') {
      return;
    }

    const stations = getStations();
    const stationNameInput = document.getElementById('station-name-input');
    const stationName = stationNameInput.value.trim().replace(/\s{2,}/g, ' ');
    if (isValidStationName(stations, stationName)) {
      addStation(stationName);
      stationNameInput.value = '';
    }
  };

  this.render = () => {
    const stations = getStations();
    this.mainContainer.innerHTML =
      stationAddContainer() + stationList(stations);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainConatiner);
}

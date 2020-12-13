import { stationAddContainer, stationList } from '../templates/index.js';

export default function StationManagerContainer({ addStation, getStations }) {
  this.mainContainer = document.querySelector('.main-container');
  this.stationAddButton = document.getElementById('station-add-button');

  this.setEventListner = () => {};

  this.handleClickMainConatiner = ({ target: { id } }) => {
    if (id !== 'station-add-button') {
      return;
    }

    const stationNameInput = document.getElementById('station-name-input');
    if (stationNameInput.value !== '') {
      addStation(stationNameInput.value);
    }
  };

  this.render = () => {
    const stations = getStations();
    this.mainContainer.innerHTML =
      stationAddContainer() + stationList(stations);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainConatiner);
}

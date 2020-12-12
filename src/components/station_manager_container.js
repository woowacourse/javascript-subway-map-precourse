import { stationAddContainer, stationList } from '../templates/index.js';

export default function StationManagerContainer({ stations }) {
  this.mainContainer = document.querySelector('.main-container');

  this.render = () => {
    this.mainContainer.innerHTML =
      stationAddContainer() + stationList(stations);
  };
}

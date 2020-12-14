import Station from './station.js';

export default class Subway {
  constructor() {
    const station = new Station();
    const createStationBtn = document.querySelector('#station-add-button');
    createStationBtn.addEventListener(
      'click',
      station.createStation.bind(station)
    );
  }
}

import { ID } from '../constants/index.js';

export const initialize = () => {
  const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
  const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);

  stationManager.style.display = 'none';
  lineManager.style.display = 'none';
};

import {
  stationAddButtonElement,
  resultStationItemsElement,
} from '../elements/stationManager.js';
import { onAddStation, onDeleteStation } from '../handlers/stationManager.js';

const addAllEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
  resultStationItemsElement.addEventListener('click', onDeleteStation);
};

export default { addAllEventListeners };

import {
  stationAddButtonElement,
  resultStationItemsElement,
} from '../elements/stationManager.js';
import { lineAddButtonElement } from '../elements/lineManager.js';
import { onAddStation, onDeleteStation } from '../handlers/stationManager.js';
import { onAddLine } from '../handlers/lineManager.js';

const addAllEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
  resultStationItemsElement.addEventListener('click', onDeleteStation);
  lineAddButtonElement.addEventListener('click', onAddLine);
};

export default { addAllEventListeners };

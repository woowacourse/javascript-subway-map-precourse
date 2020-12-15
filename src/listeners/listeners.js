import { stationAddButtonElement } from '../elements/stationManager.js';
import { onAddStation } from '../handlers/stationManager.js';

const addAllEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
};

export default { addAllEventListeners };
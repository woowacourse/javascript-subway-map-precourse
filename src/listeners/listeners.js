import {
  stationAddButtonElement,
  resultStationItemsElement,
} from '../elements/stationManager.js';
import {
  lineAddButtonElement,
  resultLineItemsElement,
} from '../elements/lineManager.js';
import { onAddStation, onDeleteStation } from '../handlers/stationManager.js';
import {
  onAddLine,
  onConverToLineContent,
  onDeleteLine,
} from '../handlers/lineManager.js';
import { lineManagerButtonElement } from '../elements/contentConvertButtons.js';

const addAllEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
  resultStationItemsElement.addEventListener('click', onDeleteStation);
  lineAddButtonElement.addEventListener('click', onAddLine);
  lineManagerButtonElement.addEventListener('click', onConverToLineContent);
  resultLineItemsElement.addEventListener('click', onDeleteLine);
};

export default { addAllEventListeners };

import {
  stationAddButtonElement,
  resultStationItemsElement,
} from '../elements/stationManager.js';
import {
  lineAddButtonElement,
  resultLineItemsElement,
} from '../elements/lineManager.js';
import {
  sectionLineMenuButtonListElement,
  sectionAddButtonElement,
  registeredStationItemsElement,
} from '../elements/sectionManager.js';
import {
  lineManagerButtonElement,
  sectionManagerButtonElement,
  mapPrintManagerButtonElement,
} from '../elements/contentConvertButtons.js';

import { onAddStation, onDeleteStation } from '../handlers/stationManager.js';
import {
  onAddLine,
  onConverToLineContent,
  onDeleteLine,
} from '../handlers/lineManager.js';
import {
  onConverToSectionContent,
  onClickSectionLineButton,
  onInsertStation,
  onPullOutStation,
} from '../handlers/sectionManager.js';
import { onPrintMap } from '../handlers/mapPrint.js';

export const addStationManagerEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
  resultStationItemsElement.addEventListener('click', onDeleteStation);
};

export const addLineMangerEventListeners = () => {
  lineAddButtonElement.addEventListener('click', onAddLine);
  lineManagerButtonElement.addEventListener('click', onConverToLineContent);
  resultLineItemsElement.addEventListener('click', onDeleteLine);
};

export const addSectionManagerEventListeners = () => {
  sectionManagerButtonElement.addEventListener(
    'click',
    onConverToSectionContent
  );
  sectionLineMenuButtonListElement.addEventListener(
    'click',
    onClickSectionLineButton
  );
  sectionAddButtonElement.addEventListener('click', onInsertStation);
  registeredStationItemsElement.addEventListener('click', onPullOutStation);
};

export const addMapPrintEventListeners = () => {
  mapPrintManagerButtonElement.addEventListener('click', onPrintMap);
};

export default {
  addStationManagerEventListeners,
  addLineMangerEventListeners,
  addSectionManagerEventListeners,
  addMapPrintEventListeners,
};

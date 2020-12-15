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

const addAllEventListeners = () => {
  stationAddButtonElement.addEventListener('click', onAddStation);
  resultStationItemsElement.addEventListener('click', onDeleteStation);
  lineAddButtonElement.addEventListener('click', onAddLine);
  lineManagerButtonElement.addEventListener('click', onConverToLineContent);
  resultLineItemsElement.addEventListener('click', onDeleteLine);
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
  mapPrintManagerButtonElement.addEventListener('click', onPrintMap);
};

export default { addAllEventListeners };

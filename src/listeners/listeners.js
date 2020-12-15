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

import {
  onAddStation,
  onDeleteStation,
  showStationManagerResultTable,
} from '../handlers/stationManager.js';
import {
  onAddLine,
  onConverToLineContent,
  onDeleteLine,
  showLineManagerResultTable,
} from '../handlers/lineManager.js';
import {
  onConverToSectionContent,
  onClickSectionLineButton,
  onInsertStation,
  onPullOutStation,
  showSectionManagerResultTable,
} from '../handlers/sectionManager.js';
import { printMap } from '../handlers/mapPrint.js';
import { convertContent } from '../routes/routes.js';
import {
  loadDataToLocalStorage,
  syncDataToAllElements,
  syncDataToLocalStorage,
  syncDataFromAllElements,
} from '../data/data.js';
import {
  syncSubwayMapFromLocalStorage,
  syncSubwayMapToLocalStorage,
} from '../store/store.js';

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
  mapPrintManagerButtonElement.addEventListener('click', printMap);
};

export const addSyncDataBeforeUnloadEventListener = () => {
  window.onbeforeunload = () => {
    syncDataFromAllElements();
    syncDataToLocalStorage();
    syncSubwayMapToLocalStorage();
  };
};

export const addSyncDataBeforeOnloadEventListener = (
  contentElements,
  defaultContentElement
) => {
  window.onload = () => {
    const contentName = window.location.hash.substr(1);
    if (contentName) {
      convertContent(contentElements, contentName);
    } else {
      convertContent(contentElements, defaultContentElement.id);
    }
    loadDataToLocalStorage();
    syncDataToAllElements();
    syncSubwayMapFromLocalStorage();
    showStationManagerResultTable();
    showLineManagerResultTable();
    showSectionManagerResultTable();
  };
};

export default {
  addStationManagerEventListeners,
  addLineMangerEventListeners,
  addSectionManagerEventListeners,
  addMapPrintEventListeners,
};

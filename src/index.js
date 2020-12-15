import { setRouterWithElements } from './routes/routes.js';
import { contentElements } from './elements/contents.js';
import {
  addLineMangerEventListeners,
  addMapPrintEventListeners,
  addSectionManagerEventListeners,
  addStationManagerEventListeners,
  addSyncDataBeforeOnloadEventListener,
  addSyncDataBeforeUnloadEventListener,
} from './listeners/listeners.js';

setRouterWithElements(contentElements);

addLineMangerEventListeners();
addMapPrintEventListeners();
addSectionManagerEventListeners();
addStationManagerEventListeners();
addSyncDataBeforeOnloadEventListener(contentElements, contentElements[0]);
addSyncDataBeforeUnloadEventListener();

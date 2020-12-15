import { setRouterWithElements } from './routes/routes.js';
import { contentElements } from './elements/contents.js';
import { loadDataToLocalStorage, syncDataToAllElements } from './data/data.js';
import eventListener from './listeners/listeners.js';

setRouterWithElements(contentElements, contentElements[0]);
loadDataToLocalStorage();
syncDataToAllElements();

eventListener.addAllEventListeners();

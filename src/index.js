import { setRouterWithElements } from './routes/routes.js';
import { contentElements } from './elements/contents.js';
import { loadDataToLocalStorage } from './data/data.js';

setRouterWithElements(contentElements, contentElements[0]);
loadDataToLocalStorage();

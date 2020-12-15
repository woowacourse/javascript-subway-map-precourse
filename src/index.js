import Buttons from './views/Buttons.js';
import { station, line, section, map } from './controllers/index.js';

const mainButtonsControllers = [station, line, section, map];

new Buttons('main', mainButtonsControllers);

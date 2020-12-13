import Tab from "./views/Tab.js";
import { station, line, section, map } from './controllers/index.js';

const mainTabContollers = [station, line, section, map];

new Tab("main", mainTabContollers);

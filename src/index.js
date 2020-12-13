import {MENU,TEMPLATE} from './constants.js';
import {clearTemplate,setTemplateVisible} from './template.js';

MENU.STATION.addEventListener('click', (e) => {
    clearTemplate();
    setTemplateVisible(TEMPLATE.STATION);
});
MENU.LINE.addEventListener('click', (e) => {
    clearTemplate();
    setTemplateVisible(TEMPLATE.LINE);});
MENU.SECTION.addEventListener('click', (e) => {
    clearTemplate();
    setTemplateVisible(TEMPLATE.SECTION);});
MENU.MAP.addEventListener('click', (e) => {
    clearTemplate();
    setTemplateVisible(TEMPLATE.MAP);});

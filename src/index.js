import {MANAGEMENT, MENU} from './constants.js';

MENU.STATION.addEventListener('click', (e) => {
    MANAGEMENT.innerHTML='<object type="text/html" data="pages/station.html"></object>';
});
MENU.LINE.addEventListener('click', (e) => {
    MANAGEMENT.innerHTML='<object type="text/html" data="pages/line.html"></object>';
});
MENU.SECTION.addEventListener('click', (e) => {
    MANAGEMENT.innerHTML='<object type="text/html" data="pages/section.html"></object>';
});
MENU.MAP_PRINT.addEventListener('click', (e) => {
    MANAGEMENT.innerHTML='<object type="text/html" data="pages/map.html"></object>';
});
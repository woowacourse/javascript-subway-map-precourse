import { canAccessSectionPage } from './Controller/sectionManager.js';
import { canAccessMapPrintPage } from './Controller/mapPrintManager.js';
import viewContainers from './View/index.js';
import { canAccessLinePage } from './Controller/lineManager.js';
import { appendChilds, makeElement } from './Controller/utils.js';
import cssText from './key/cssText.js';
import words from './key/words.js';

const app = document.getElementById('app');
const container = makeElement({tag: 'div', className: 'container'})
const buttonContainer = makeElement({tag: 'div'});
const stationPageButton = makeElement({tag: 'button', innerText: words.STATION_PAGE_BUTTON, id: words.STATION_PAGE_BUTTON_ID});
const linePageButton = makeElement({tag: 'button', innerText: words.LINE_PAGE_BUTTON, id:words.LINE_PAGE_BUTTON_ID});
const sectionPageButton = makeElement({tag: 'button', innerText: words.SECTION_PAGE_BUTTON, id:words.SECTION_PAGE_BUTTON_ID});
const mapPrintPageButton = makeElement({tag: 'button', innerText: words.MAP_PRINT_PAGE, id:words.MAP_PRINT_PAGE_ID});

const subwayStationInit = () => {
	stationPageButton.addEventListener('click', () => {
		new viewContainers.STATION_CONTAINER(container).initializer();
	});
	linePageButton.addEventListener('click', () => {
		if (canAccessLinePage()) new viewContainers.LINE_CONTAINER(container).initializer();
	});
	sectionPageButton.addEventListener('click', () => {
		if (canAccessSectionPage()) new viewContainers.SECTION_CONTAINER(container).initializer();
	});
	mapPrintPageButton.addEventListener('click', (e) => {
		if (canAccessMapPrintPage) new viewContainers.MAP_PRINT_CONTAINER(container).initializer();
	});
	new viewContainers.STATION_CONTAINER(container).initializer();
};

appendChilds(buttonContainer, [
    stationPageButton,
    linePageButton,
    sectionPageButton,
    mapPrintPageButton,
]);
appendChilds(app, [buttonContainer, container]);

subwayStationInit();

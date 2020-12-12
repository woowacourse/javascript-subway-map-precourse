import { canAccessLinePage } from './Controller/lineManager.js';
import { canAccessSectionPage } from './Controller/sectionManager.js';
import { canAccessMapPrintPage } from './Controller/mapPrintManager.js';
import viewContainers from './View/index.js';

const stationManagerButton = document.getElementById('station-manager-button');
const lineManagerButton = document.getElementById('line-manager-button');
const sectionManagerButton = document.getElementById('section-manager-button');
const mapPrintManagerButton = document.getElementById(
	'map-print-manager-button'
);

const container = document.querySelector('.container');

const SubwayStationInit = () => {
	stationManagerButton.addEventListener('click', () => {
		viewContainers.STATION_CONTAINER(container);
	});
	lineManagerButton.addEventListener('click', () => {
		if (canAccessLinePage()) viewContainers.LINE_CONTAINER(container);
	});
	sectionManagerButton.addEventListener('click', () => {
		if (canAccessSectionPage()) viewContainers.SECTION_CONTAINER(container);
	});
	mapPrintManagerButton.addEventListener('click', (e) => {
		if (canAccessMapPrintPage) viewContainers.MAP_PRINT_CONTAINER(container);
	});
	viewContainers.STATION_CONTAINER(container);
};

SubwayStationInit();

import { canAccessSectionPage } from './Controller/sectionManager.js';
import { canAccessMapPrintPage } from './Controller/mapPrintManager.js';
import viewContainers from './View/index.js';
import { canAccessLinePage } from './Controller/lineManager.js';

const stationManagerButton = document.getElementById('station-manager-button');
const lineManagerButton = document.getElementById('line-manager-button');
const sectionManagerButton = document.getElementById('section-manager-button');
const mapPrintManagerButton = document.getElementById(
	'map-print-manager-button'
);

const container = document.querySelector('.container');

const SubwayStationInit = () => {
	stationManagerButton.addEventListener('click', () => {
		(new viewContainers.STATION_CONTAINER(container)).initializer();
	});
	lineManagerButton.addEventListener('click', () => {
		if (canAccessLinePage()) (new viewContainers.LINE_CONTAINER(container)).initializer();
	});
	sectionManagerButton.addEventListener('click', () => {
		if (canAccessSectionPage()) (new viewContainers.SECTION_CONTAINER(container)).initializer();
	});
	mapPrintManagerButton.addEventListener('click', (e) => {
		if (canAccessMapPrintPage) (new viewContainers.MAP_PRINT_CONTAINER(container)).initializer();
	});
	(new viewContainers.STATION_CONTAINER(container)).initializer();
};

SubwayStationInit();

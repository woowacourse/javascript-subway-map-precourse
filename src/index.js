import Line from './Model/Line.js';
import Station from './Model/Station.js';
import viewContainers from './View/index.js';

const stationManagerBtn = document.getElementById('station-manager-button');
const lineManagerBtn = document.getElementById('line-manager-button');
const sectionManagerBtn = document.getElementById('section-manager-button');
const mapPrintManagerBtn = document.getElementById('map-print-manager-button');

const container = document.querySelector('.container');

const SubwayStationInit = () => {
	const CLICK = 'click';
	stationManagerBtn.addEventListener(CLICK, ()=>viewContainers.STATION_CONTAINER(container));
	lineManagerBtn.addEventListener(CLICK, ()=>viewContainers.LINE_CONTAINER(container));
	sectionManagerBtn.addEventListener(CLICK, ()=>viewContainers.SECTION_CONTAINER(container));
	mapPrintManagerBtn.addEventListener(CLICK, ()=>viewContainers.MAP_PRINT_CONTAINER(container));
    
    // Station.saveAllStations([]);
    // Line.saveAllLines([]);

	viewContainers.STATION_CONTAINER(container);
};

SubwayStationInit();
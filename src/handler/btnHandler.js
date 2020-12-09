import lineContainer from '../View/lineManager.js';
import mapPrintContainer from '../View/mapPrintManager.js';
import sectionContainer from '../View/sectionManager.js';
import stationContainer from '../View/stationManager.js';

const stationManagerBtn = document.getElementById('station-manager-button');
const lineManagerBtn = document.getElementById('line-manager-button');
const sectionManagerBtn = document.getElementById('section-manager-button');
const mapPrintManagerBtn = document.getElementById('map-print-manager-button');

const container = document.querySelector('.container');

const init = () => {
	const CLICK = 'click';
	stationManagerBtn.addEventListener(CLICK, ()=>stationContainer(container));
	lineManagerBtn.addEventListener(CLICK, ()=>lineContainer(container));
	sectionManagerBtn.addEventListener(CLICK, ()=>sectionContainer(container));
	mapPrintManagerBtn.addEventListener(CLICK, ()=>mapPrintContainer(container));
};

export default init;

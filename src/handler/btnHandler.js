import lineContainer from '../View/lineManager.js';
import mapPrintContainer from '../View/mapPrintManager.js';
import sectionContainer from '../View/sectionManager.js';
import stationContainer from '../View/stationManager.js';

const stationManagerBtn = document.getElementById('station-manager-button');
const lineManagerBtn = document.getElementById('line-manager-button');
const sectionManagerBtn = document.getElementById('section-manager-button');
const mapPrintManagerBtn = document.getElementById('map-print-manager-button');

const init = () => {
	const CLICK = 'click';
	stationManagerBtn.addEventListener(CLICK, stationContainer);
	lineManagerBtn.addEventListener(CLICK, lineContainer);
	sectionManagerBtn.addEventListener(CLICK, sectionContainer);
	mapPrintManagerBtn.addEventListener(CLICK, mapPrintContainer);
};

export default init;

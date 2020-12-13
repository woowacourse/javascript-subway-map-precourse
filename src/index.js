import { makeElement, appendElements } from './controllers/utils.js';
import { tabController } from './controllers/tabController.js';

const stationManagerBtn = document.querySelector('#station-manager-button');
const lineManagerBtn = document.querySelector('#line-manager-button');
const sectionManagerBtn = document.querySelector('#section-manager-button');
const mapPrintManagerBtn = document.querySelector('#map-print-manager-button');

stationManagerBtn.addEventListener('click', e => tabController(e.target.value));
lineManagerBtn.addEventListener('click', e => tabController(e.target.value));
sectionManagerBtn.addEventListener('click', e => tabController(e.target.value));
mapPrintManagerBtn.addEventListener('click', e => tabController(e.target.value));

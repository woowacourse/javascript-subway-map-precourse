import {addClickEventListener} from './common/elements.js';
import StationManager from './station-manager.js';
import LineManager from './line-manager.js';
import SectionManager from './section-manager.js';
import MapPrintManager from './map-print-manager.js';

export default function stationPageInit() {
    const stationManagerButton = document.getElementById('station-manager-button');
    const lineManagerButton = document.getElementById('line-manager-button');
    const sectionManagerButton = document.getElementById('section-manager-button');
    const mapPrintManagerButton = document.getElementById('map-print-manager-button');
    addClickEventListener(stationManagerButton, () => {new StationManager()});
    addClickEventListener(lineManagerButton, () => {new LineManager()});
    addClickEventListener(sectionManagerButton, () => {new SectionManager()});
    addClickEventListener(mapPrintManagerButton, () => {new MapPrintManager()});
}

new stationPageInit();

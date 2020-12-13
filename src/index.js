import Menu from '/src/menu/menu.js';
import StationManager from '/src/station/station-manager.js';
import LineManager from '/src/line/line-manager.js';
import SectionManager from '/src/section/section-manager.js';
import MapManager from '/src/map/map-manager.js';

export default class SubwayStationApp {
	constructor() {
		new Menu();
		new StationManager();
		new LineManager();
		new SectionManager();
		new MapManager();
	}
}

new SubwayStationApp();
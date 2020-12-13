import MenuController from '/src/menu/controller/menu-controller.js';

export default class SubwayStationApp {
	constructor() {
		new MenuController();
	}
}

new SubwayStationApp();
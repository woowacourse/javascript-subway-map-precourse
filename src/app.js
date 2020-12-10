import EventHandler from './util/event_handler/event_handler.js';
import StationManagerRenderer from './util/renderer/station_manager_renderer.js';

export default class App {
  constructor() {
    this.functions = [];
    this.renderApp();
    this.activateApp();
  }

  renderApp() {
    this.functions.push(new StationManagerRenderer());
  }

  activateApp() {
    const eventHandler = new EventHandler();

    this.functions.forEach(func =>
      eventHandler.handleClickEvent(func.id, func.renderFunction)
    );
  }
}

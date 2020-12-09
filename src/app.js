import StationManagerRenderer from './util/renderer/station_manager_renderer.js';

export default class App {
  constructor() {
    this.renderApp();
  }

  renderApp() {
    new StationManagerRenderer();
  }
}

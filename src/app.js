import AppRenderer from './util/renderer/app_renderer/app_renderer.js';
import EventHandler from './util/handler/event_handler/event_handler.js';

export default class App {
  constructor() {
    this.appRenderer = new AppRenderer();
    this.eventHandler = new EventHandler();
    this.activateApp();
  }

  activateApp() {
    this.activateFunctionRenderer(this.appRenderer.getFunctionRenderers());
  }

  activateFunctionRenderer(functionRenderers) {
    functionRenderers.forEach(renderer => {
      this.eventHandler.handleClickEvent(
        renderer.buttonId,
        renderer.renderFunction
      );
    });
  }
}

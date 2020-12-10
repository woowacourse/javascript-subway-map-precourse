import AppRenderer from './util/renderer/app_renderer/app_renderer.js';
import EventHandler from './util/handler/event_handler/event_handler.js';
import { ATTRIBUTES } from './library/constant/constant.js';

const appRenderer = new AppRenderer();
const eventHandler = new EventHandler();

export default class App {
  constructor() {
    this.appRenderer = appRenderer;
    this.activateApp();
  }

  activateApp() {
    this.activateFunctionRenderer(this.appRenderer.functionRenderers);
  }

  activateFunctionRenderer(functionRenderers) {
    functionRenderers.forEach(renderer => {
      eventHandler.handleClickEvent(
        renderer.id + ATTRIBUTES.BUTTON,
        renderer.displayFunction,
        renderer
      );
    });
  }
}

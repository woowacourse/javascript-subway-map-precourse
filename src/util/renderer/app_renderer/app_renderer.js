import StationManagerRenderer from '../function_renderer/station_manager_renderer.js';

export default class AppRenderer {
  constructor() {
    this.renderApp();
  }

  renderApp() {
    this.renderFunctionSection();
  }

  renderFunctionSection() {
    const functionRenderers = this.getFunctionRenderers();

    functionRenderers.forEach(renderer => renderer.renderFunctionButton());
  }

  getFunctionRenderers() {
    const functionRenderers = [];

    functionRenderers.push(new StationManagerRenderer());

    return functionRenderers;
  }
}

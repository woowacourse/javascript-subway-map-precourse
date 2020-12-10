import { nodeGenerator, nodeSelector } from '../../object/object.js';
import StationManagerRenderer from '../function_renderer/station_manager_renderer.js';
import { NODES } from '../../../library/constant/constant.js';

const functionRenderers = [new StationManagerRenderer()];

export default class AppRenderer {
  constructor() {
    this.functionRenderers = functionRenderers;
    this.renderApp();
  }

  renderApp() {
    this.renderFunctionSection();
    this.renderFunctions();
  }

  renderFunctionSection() {
    const functionSection = nodeGenerator.getSection();
    const functionButtonSection = nodeGenerator.getSection();

    functionButtonSection.className = NODES.FUNCTION_BUTTON_SECTION;
    functionSection.appendChild(functionButtonSection);
    functionSection.className = NODES.FUNCTION_SECTION;
    nodeSelector.selectId(NODES.APP).appendChild(functionSection);
    this.renderFunctionButtons();
  }

  renderFunctionButtons() {
    this.functionRenderers.forEach(renderer => renderer.renderFuctionButton());
  }

  renderFunctions() {
    this.functionRenderers.forEach(renderer => renderer.renderFunction());
  }
}

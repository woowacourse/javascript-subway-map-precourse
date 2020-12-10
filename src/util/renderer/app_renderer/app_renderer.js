import NodeGenerator from '../../generator/node_generator.js';
import NodeSelector from '../../selector/node_selector.js';
import StationManagerRenderer from '../function_renderer/station_manager_renderer.js';
import {
  FUNCTION_SECTION_CLASS,
  FUNCTION_BUTTON_SECTION_CLASS,
  APP_ID,
} from '../../../library/constant/constant.js';

export default class AppRenderer {
  constructor() {
    this.nodeGenerator = new NodeGenerator();
    this.NodeSelector = new NodeSelector();

    this.renderApp();
  }

  renderApp() {
    this.renderFunctionSection();
  }

  renderFunctionSection() {
    const functionSection = this.nodeGenerator.getSection();
    const functionButtonSection = this.nodeGenerator.getSection();

    functionButtonSection.className = FUNCTION_BUTTON_SECTION_CLASS;
    functionSection.appendChild(functionButtonSection);
    functionSection.className = FUNCTION_SECTION_CLASS;
    this.NodeSelector.selectId(APP_ID).appendChild(functionSection);
    this.renderFunctionButtons();
  }

  renderFunctionButtons() {
    const functionRenderers = this.getFunctionRenderers();

    functionRenderers.forEach(renderer => renderer.renderFuctionButton());
  }

  getFunctionRenderers() {
    const functionRenderers = [];

    functionRenderers.push(new StationManagerRenderer());

    return functionRenderers;
  }
}

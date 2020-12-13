import StationManager from './components/stationManager.js';
import LineManager from './components/lineManager.js';
import SectionManager from './components/sectionManager.js';
import { functionButton } from './view/template.js';
import { ID } from './constants/index.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.$functionButtonContainer = this.createFunctionButtonContainer();

    this.stationManager = new StationManager($target);
    this.lineManager = new LineManager($target);
    this.sectionManager = new SectionManager($target);
  }

  createFunctionButtonContainer() {
    const $functionButtonContainer = document.createElement('div');
    $functionButtonContainer.className = 'function-button-container';
    $functionButtonContainer.innerHTML = functionButton();
    this.$target.appendChild($functionButtonContainer);

    return $functionButtonContainer;
  }
}

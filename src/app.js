import StationManager from './components/stationManager.js';
import LineManager from './components/lineManager.js';
import SectionManager from './components/sectionManager.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.$functionButtonContainer = this.createFunctionButtonContainer();

    this.stationManager = new StationManager($target, this.$functionButtonContainer);
    this.lineManager = new LineManager($target, this.$functionButtonContainer);
    this.sectionManager = new SectionManager($target, this.$functionButtonContainer);
  }

  createFunctionButtonContainer() {
    const $functionButtonContainer = document.createElement('div');
    $functionButtonContainer.className = 'function-button-container';
    this.$target.appendChild($functionButtonContainer);

    return $functionButtonContainer;
  }
}

import StationManager from './components/stationManager.js';
import LineManager from './components/lineManager.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.$functionButtonContainer = this.createFunctionButtonContainer();

    this.station = new StationManager($target, this.$functionButtonContainer);
    this.line = new LineManager($target, this.$functionButtonContainer);
  }

  createFunctionButtonContainer() {
    const $functionButtonContainer = document.createElement('div');
    $functionButtonContainer.className = 'function-button-container';
    this.$target.appendChild($functionButtonContainer);

    return $functionButtonContainer;
  }
}

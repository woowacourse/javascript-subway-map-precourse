import Station from './components/station.js';
import Line from './components/line.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.$functionButtonContainer = this.createFunctionButtonContainer();

    this.station = new Station($target, this.$functionButtonContainer);
    this.line = new Line($target, this.$functionButtonContainer);
  }

  createFunctionButtonContainer() {
    const $functionButtonContainer = document.createElement('div');
    $functionButtonContainer.className = 'function-button-container';
    this.$target.appendChild($functionButtonContainer);

    return $functionButtonContainer;
  }
}

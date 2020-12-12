import Component from '../../library/core/component.js';
import StationList from './station-list.js';
import StationInput from './station-input.js';

class StationManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  render = () => {
    this.mountTemplate();
    this.mountComponents();
  };

  mountTemplate() {
    this._$target.innerHTML = `
      <div id="station-input-container"></div>
      <div id="station-list"></div>
    `;
  }

  mountComponents() {
    const $stationInputContainer = this._$target.querySelector(
      '#station-input-container'
    );
    const $stationList = this._$target.querySelector('#station-list');
    new StationInput($stationInputContainer);
    new StationList($stationList);
  }
}

export default StationManager;

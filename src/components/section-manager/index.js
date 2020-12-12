import Component from '../../library/core/component.js';
import LineSelector from './line-selector.js';

class SectionManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <div id="line-selector"></div>
      <div id="section-manager"></div>
    `;
  }

  mountComponents() {
    const $lineSelector = this._$target.querySelector('#line-selector');
    new LineSelector($lineSelector);
  }
}

export default SectionManager;

import Component from '../../library/core/component.js';
import LineList from './line-list.js';
import LineInput from './line-input.js';

class LineManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  render = () => {
    this.mountTemplate();
    this.initializeComponents();
  };

  mountTemplate() {
    this._$target.innerHTML = `
      <div id="line-input-container"></div>
      <div id="line-list-container"></div>
    `;
  }

  initializeComponents() {
    const $lineInputContainer = this._$target.querySelector(
      '#line-input-container'
    );
    const $lineListContainer = this._$target.querySelector(
      '#line-list-container'
    );
    new LineInput($lineInputContainer);
    new LineList($lineListContainer);
  }
}

export default LineManager;

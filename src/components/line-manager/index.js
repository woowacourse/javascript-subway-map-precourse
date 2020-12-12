import Component from '../../library/core/component.js';
import LineList from './line-list.js';
import LineInput from './line-input.js';

class LineManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <div id="line-input-container"></div>
      <div id="line-list-container"></div>
    `;
  }

  mountComponents() {
    const $lineInputContainer = this._$target.querySelector(
      '#line-input-container'
    );
    const $lineListContainer = this._$target.querySelector(
      '#line-list-container'
    );
    new LineInput($lineInputContainer, {
      stations: this._props.stations,
      lines: this._props.lines,
    });
    new LineList($lineListContainer);
  }
}

export default LineManager;

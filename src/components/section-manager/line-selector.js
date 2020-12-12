import Component from '../../library/core/component.js';

class LineSelector extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<h3>구간을 수정할 노선을 선택해주세요</h3>
		`;
  }
}

export default LineSelector;

import Component from '../../library/core/component.js';

class StationList extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<h2>🚉 지하철 역 목록</h2>
		`;
  }
}

export default StationList;

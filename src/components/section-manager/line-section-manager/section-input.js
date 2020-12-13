import Component from '../../../library/core/component.js';
import { createOptionTemplate } from '../../../library/utils/template.js';

class SectionInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<h5>구간 등록</h5>
			<select>
				${createOptionTemplate(this._props.stations.value)}
			</select>
			<input type="number" placeholder="순서"></input>
			<button>등록</button>
		`;
  }
}

export default SectionInput;

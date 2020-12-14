import {
  EMPTY_INPUT_MESSAGE,
  LEFTOVER_MESSAGE,
} from '../../../library/constants/common-alert.js';
import { LINES } from '../../../library/constants/localstorage.js';
import Component from '../../../library/core/component.js';
import { createOptionTemplate } from '../../../library/utils/template.js';

class SectionInput extends Component {
  constructor($target, props) {
    super($target, props);
    props.lines.subscribe(this.render);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<h5>구간 등록</h5>
			<select id="section-station-selector">
				${createOptionTemplate(this._props.stations.value)}
			</select>
			${this.createInputTemplate()}
			<button id="section-add-button">등록</button>
		`;
  }

  createInputTemplate() {
    return `
			<input
				id ="section-order-input"
				type="number"
				min="0"
				max="${this._props.targetLine.sections.length}"
				placeholder="순서"
			/>
		`;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'section-add-button') {
        this.handleAddSectionEvent();
      }
    });
  }

  handleAddSectionEvent() {
    const order = this._$target.querySelector('#section-order-input').value;
    const sectionToAdd = this._$target.querySelector(
      '#section-station-selector'
    ).value;
    if (this.hasEmptyInput(order, sectionToAdd)) {
      alert(EMPTY_INPUT_MESSAGE + LEFTOVER_MESSAGE);
      return;
    }
    this.insertSection(this._props.targetLine, { order, sectionToAdd });
  }

  hasEmptyInput(order, sectionToAdd) {
    return order === '' || sectionToAdd === '';
  }

  insertSection(targetLine, { order, sectionToAdd }) {
    const { lines } = this._props;
    targetLine.sections.splice(order, 0, sectionToAdd);
    localStorage.setItem(LINES, JSON.stringify(lines.value));
    lines.renderAll();
  }
}

export default SectionInput;

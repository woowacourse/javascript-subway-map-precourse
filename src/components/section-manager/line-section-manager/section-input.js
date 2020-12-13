import Component from '../../../library/core/component.js';
import { createOptionTemplate } from '../../../library/utils/template.js';

class SectionInput extends Component {
  #targetLine;

  constructor($target, props) {
    super($target, props);
    props.lines.subscribe(this.render);
    this.initializeStates();
    this.render();
  }

  initializeStates() {
    const { targetLineName, lines } = this._props;
    this.#targetLine = lines.value.find(
      line => line.lineName === targetLineName
    );
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
				max="${this.#targetLine.sections.length}"
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
    this.insertSection(this.#targetLine, { order, sectionToAdd });
  }

  insertSection(targetLine, { order, sectionToAdd }) {
    targetLine.sections.splice(order, 0, sectionToAdd);
    this._props.lines.renderAll();
  }
}

export default SectionInput;

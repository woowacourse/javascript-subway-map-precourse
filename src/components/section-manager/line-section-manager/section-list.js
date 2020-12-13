import { LINES } from '../../../library/constants/localstorage.js';
import Component from '../../../library/core/component.js';

class SectionList extends Component {
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
			<table>
				<tr>
					<th>순서</th>
					<th>이름</th>
					<th>설정</th>
				</tr>
				${this.createTableRowsTemplate()}
			</table>
		`;
  }

  createTableRowsTemplate() {
    return this.#targetLine.sections
      .map((section, index) => this.createTableRowTemplate(index, section))
      .join('');
  }

  createTableRowTemplate(key, value) {
    return `
			<tr data-key=${key}>
				<td>${key}</td>
				<td>${value}</td>
				<td><button class="section-delete-button">노선에서 제거</button></td>
			</tr>
		`;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.classList.contains('section-delete-button')) {
        this.removeSection(event.target.closest('[data-key]').dataset.key);
      }
    });
  }

  removeSection(targetIndex) {
    const { lines } = this._props;
    this.#targetLine.sections.splice(targetIndex, 1);
    localStorage.setItem(LINES, JSON.stringify(lines.value));
    lines.renderAll();
  }
}

export default SectionList;

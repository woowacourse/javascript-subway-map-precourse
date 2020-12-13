import { LINES } from '../../../library/constants/localstorage.js';
import { TOO_FEW_SECTIONS_MESSAGE } from '../../../library/constants/section-manager-alert.js';
import Component from '../../../library/core/component.js';

class SectionList extends Component {
  constructor($target, props) {
    super($target, props);
    props.lines.subscribe(this.render);
    this.render();
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
    return this._props.targetLine.sections
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
        this.handleRemoveSectionEvent(
          event.target.closest('[data-key]').dataset.key
        );
      }
    });
  }

  handleRemoveSectionEvent(targetSection) {
    if (!this.hasEnoughSections()) {
      alert(TOO_FEW_SECTIONS_MESSAGE);
      return;
    }
    this.removeSection(targetSection);
  }

  hasEnoughSections() {
    const LEAST_SECTION_COUNT = 2;
    return this._props.targetLine.sections.length > LEAST_SECTION_COUNT;
  }

  removeSection(targetIndex) {
    const { lines } = this._props;
    this._props.targetLine.sections.splice(targetIndex, 1);
    localStorage.setItem(LINES, JSON.stringify(lines.value));
    lines.renderAll();
  }
}

export default SectionList;

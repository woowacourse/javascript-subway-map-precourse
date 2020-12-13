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
    const { targetLineName, lines } = this._props;
    const targetLine = lines.value.find(
      line => line.lineName === targetLineName
    );

    return targetLine.sections
      .map((section, index) => this.createTableRowTemplate(index, section))
      .join('');
  }

  createTableRowTemplate(key, value) {
    return `
			<tr data-key=${key}>
				<td>${key}</td>
				<td>${value}</td>
				<td><button>노선에서 제거</button></td>
			</tr>
		`;
  }
}

export default SectionList;

import Component from '../../library/core/component.js';

class LineList extends Component {
  constructor($target, props) {
    super($target, props);
    this._props.lines.subscribe(this.render);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<h3>🚉 지하철 노선 목록</h3>
			<table>
				<tr>
					<th>노선 이름</th>
					<th>상행 종점역</th>
					<th>하행 종점역</th>
					<th>설정</th>
				</tr>
				${this.createLineTableRowsTemplate()}
			</table>
		`;
  }

  createLineTableRowsTemplate() {
    let template = '';
    this._props.lines.value.forEach(line => {
      template += `
					<tr>
						<td>${line.lineName}</td>
						<td>${line.sections[0]}</td>
						<td>${line.sections.slice(-1)[0]}</td>
						<td><button class="line-delete-button">노선에서 제거</button></td>
					</tr>
			`;
    });

    return template;
  }
}

export default LineList;

import Component from '../../library/core/component.js';

class LineList extends Component {
  constructor($target, props) {
    super($target, props);
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
			</table>
		`;
  }
}

export default LineList;

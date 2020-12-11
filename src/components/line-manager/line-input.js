/* eslint-disable max-lines-per-function */
import Component from '../../library/core/component.js';

class LineInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  render = () => {
    this._$target.innerHTML = `
			<div id="line-name-input-container">
				<div><strong>노선 이름</strong></div>
				<input id="line-name-input" placeholder="노선 이름을 입력해주세요." />
			</div>
			<div id="terminal-selector-container">
				<div>
					<label for="start-station"><strong>상행 종점</strong></label>
					<select name="start-station" id="line-start-station-selector"  >
						<option value="hi">hi</option>
					</select>
				</div>
				<div>
					<label for="end-station"><strong>하행 종점</strong></label>
					<select name="end-station" id="line-end-station-selector">
						<option value="ho">ho</option>
					</select>
				</div>
			</div>
			<button id="line-add-button">노선 추가</button>
		`;
  };
}

export default LineInput;

import Component from '../../library/core/component.js';

class StationInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  render = () => {
    this._$target.innerHTML = `
			<div><strong>역 이름</strong></div>
			<input id="station-name-input" placeholder="역 이름을 입력해주세요"/>
			<button id="station-add-button">역 추가</button>
		`;
  };
}

export default StationInput;

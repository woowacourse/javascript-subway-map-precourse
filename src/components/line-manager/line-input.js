import Component from '../../library/core/component.js';

class LineInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<div id="line-name-input-container">
				<div><strong>노선 이름</strong></div>
				<input id="line-name-input" placeholder="노선 이름을 입력해주세요." />
			</div>
			<div id="station-selector-container">
			 	${this.createStartStationSelectTemplate()}
				${this.createEndStationSelectTemplate()}
			</div>
			<button id="line-add-button">노선 추가</button>
		`;
  }

  createStartStationSelectTemplate() {
    let template = `
				<div>
					<label for="start-station"><strong>상행 종점</strong></label>
					<select name="start-station" id="line-start-station-selector">
						${this.createOptionTemplate()}
					</select>
				</div>
		`;

    return template;
  }

  createEndStationSelectTemplate() {
    let template = `
			<div>
				<label for="end-station"><strong>하행 종점</strong></label>
				<select name="end-station" id="line-end-station-selector">
					${this.createOptionTemplate()}
				</select>
			</div>
		`;

    return template;
  }

  createOptionTemplate() {
    let template = '';
    this._props.stations.value.forEach(
      station => (template += `<option value="${station}">${station}</option>`)
    );

    return template;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'line-add-button') {
        this.handleEvent();
      }
    });
  }

  handleEvent() {
    const $lineNameInput = this._$target.querySelector('#line-name-input');
    const lineName = $lineNameInput.value.trim();
    const startStation = this._$target.querySelector(
      '#line-start-station-selector'
    ).value;
    const endStation = this._$target.querySelector('#line-end-station-selector')
      .value;
    this.addLine(lineName, [startStation, endStation]);
    $lineNameInput.value = '';
    $lineNameInput.focus();
  }

  addLine(lineName, terminals) {
    const newLine = { lineName, sections: terminals };
    this._props.lines.value = [...this._props.lines.value, newLine];
  }
}

export default LineInput;

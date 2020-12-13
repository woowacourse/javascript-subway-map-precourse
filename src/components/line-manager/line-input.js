import { LEFTOVER_MESSAGE } from '../../library/constants/common-alert.js';
import {
  DUPLICATE_LINE_MESSAGE,
  EMPTY_INPUT_MESSAGE,
  SAME_TERMINAL_MESSAGE,
} from '../../library/constants/line-manager-alert.js';
import { LINES } from '../../library/constants/localstorage.js';
import Component from '../../library/core/component.js';
import { createOptionTemplate } from '../../library/utils/template.js';
import { hasStringEnoughLength } from '../../library/utils/validation.js';

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
						${createOptionTemplate(this._props.stations.value)}
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
					${createOptionTemplate(this._props.stations.value)}
				</select>
			</div>
		`;

    return template;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'line-add-button') {
        this.handleAddLineEvent();
      }
    });
  }

  handleAddLineEvent() {
    const $lineNameInput = this._$target.querySelector('#line-name-input');
    const lineName = $lineNameInput.value.trim();
    const startStation = document.querySelector('#line-start-station-selector')
      .value;
    const endStation = document.querySelector('#line-end-station-selector')
      .value;
    if (!this.isValidInput(lineName, [startStation, endStation])) {
      this.alertByCase(lineName, [startStation, endStation]);
      return;
    }
    this.addLine(lineName, [startStation, endStation]);
    $lineNameInput.value = '';
    $lineNameInput.focus();
  }

  isValidInput(lineName, stations) {
    return (
      hasStringEnoughLength(lineName, 1) &&
      hasStringEnoughLength(stations[0], 1) &&
      hasStringEnoughLength(stations[1], 1) &&
      !this.hasDuplicateLineName(lineName) &&
      stations[0] !== stations[1]
    );
  }

  hasDuplicateLineName(lineName) {
    return this._props.lines.value
      .map(line => line.lineName)
      .includes(lineName);
  }

  alertByCase(lineName, stations) {
    const alertCases = [];
    if (
      !hasStringEnoughLength(lineName, 1) ||
      !hasStringEnoughLength(stations[0], 1) ||
      !hasStringEnoughLength(stations[1], 1)
    ) {
      alertCases.push(EMPTY_INPUT_MESSAGE);
    }
    if (this.hasDuplicateLineName(lineName)) {
      alertCases.push(DUPLICATE_LINE_MESSAGE);
    }
    if (stations[0] === stations[1]) {
      alertCases.push(SAME_TERMINAL_MESSAGE);
    }
    alert(alertCases.join(', ') + LEFTOVER_MESSAGE);
  }

  addLine(lineName, terminals) {
    const { lines } = this._props;
    const newLine = { lineName, sections: terminals };
    lines.value = [...lines.value, newLine];
    localStorage.setItem(LINES, JSON.stringify(lines.value));
  }
}

export default LineInput;

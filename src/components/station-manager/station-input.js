import {
  DUPLICATE_STATION_MESSAGE,
  LEFTOVER_MESSAGE,
  SHORT_INPUT_MESSAGE,
} from '../../library/constants/station-alert.js';
import Component from '../../library/core/component.js';
import { hasStringEnoughLength } from '../../library/utils/validation.js';

class StationInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<div><strong>역 이름</strong></div>
			<input id="station-name-input" placeholder="역 이름을 입력해주세요"/>
			<button id="station-add-button">역 추가</button>
		`;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'station-add-button') {
        this.handleEvent();
      }
    });
    this._$target.addEventListener('keyup', event => {
      if (event.target.id === 'station-name-input' && event.key === 'Enter') {
        this.handleEvent();
      }
    });
  }

  handleEvent() {
    const $stationNameInput = document.querySelector('#station-name-input');
    const newStation = $stationNameInput.value.trim();
    $stationNameInput.focus();
    if (!this.isValidInput(newStation)) {
      this.alertByCase(newStation);
      return;
    }
    this.addStation(newStation);
    $stationNameInput.value = '';
  }

  addStation(newStation) {
    this._props.stations.value = [...this._props.stations.value, newStation];
  }

  isValidInput(input) {
    return (
      hasStringEnoughLength(input, 2) &&
      !this._props.stations.value.includes(input)
    );
  }

  alertByCase(input) {
    const alertCases = [];
    if (!hasStringEnoughLength(input, 2)) {
      alertCases.push(SHORT_INPUT_MESSAGE);
    }
    if (this._props.stations.value.includes(input)) {
      alertCases.push(DUPLICATE_STATION_MESSAGE);
    }
    alert(alertCases.join(', ') + LEFTOVER_MESSAGE);
  }
}

export default StationInput;

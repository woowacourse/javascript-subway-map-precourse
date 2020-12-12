import Component from '../../library/core/component.js';

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
        this.addStation();
      }
    });
    this._$target.addEventListener('keyup', event => {
      if (event.target.id === 'station-name-input' && event.key === 'Enter') {
        this.addStation();
      }
    });
  }

  addStation() {
    const $stationNameInput = document.querySelector('#station-name-input');
    const newStation = $stationNameInput.value;
    this._props.stations.value = [...this._props.stations.value, newStation];
  }
}

export default StationInput;

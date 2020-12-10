import { ID, NAME } from '../../constants/index.js';
import { stationManagerTemplate } from '../../view/template.js';

export default class Station {
  constructor($target, $functionButtonContainer) {
    this.createStationManagerButton($functionButtonContainer);
    this.createStationManager($target);
    this.handleStationManagerButton();

    this.stations = ['인천', '동대구']; // 임시 데이터: local Storage로 옮기기
  }

  createStationManagerButton($functionButtonContainer) {
    const stationManagerButton = document.createElement('button');
    stationManagerButton.id = ID.STATION_MANAGER_BUTTON;
    stationManagerButton.innerHTML = NAME.STATION_MANAGER_BUTTON_NAME;

    $functionButtonContainer.appendChild(stationManagerButton);
  }

  createStationManager($target) {
    const $stationManager = document.createElement('div');
    $stationManager.id = `${ID.STATION_MANAGER}`;
    $target.appendChild($stationManager);
  }

  handleStationManagerButton() {
    const stationManagerButton = document.querySelector(
      `#${ID.STATION_MANAGER_BUTTON}`
    );

    stationManagerButton.addEventListener('click', () => {
      this.render();
    });
  }

  render() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
    stationManager.innerHTML = stationManagerTemplate(this.stations);

    // TODO: render에서 분리
    const stationAddButton = document.querySelector('#station-add-button');
    stationAddButton.addEventListener('click', () => {
      console.log('Add');
    });
  }
}

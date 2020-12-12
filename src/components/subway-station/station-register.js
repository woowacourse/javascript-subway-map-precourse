import {STATION} from '../../constants.js';

class StationRegister {
  template() {
    return `
      <b>역 이름</b><br>
      <input id=${STATION.INPUT.ID} placeholder="역 이름을 입력해주세요."></input>
      <button id=${STATION.BUTTON.ADD.ID}>역 추가</button>
    `;
  }
}

const stationRegister = new StationRegister();

export default stationRegister;

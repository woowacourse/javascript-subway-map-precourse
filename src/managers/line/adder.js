import { Line } from '../../classes/line.js';

// 2. 노선 관리 - 신규 노선 추가 요청
export const requestToAdd = (menu) => {
  const lineNameInput = document.getElementById(`${menu}-name-input`);
  const startStation = document.getElementById('line-start-station-selector');
  const endStation = document.getElementById('line-end-station-selector');
  const line = new Line(
    lineNameInput.value,
    startStation.value,
    endStation.value
  );
  const exception = line.unableToAdd();

  if (exception) {
    return alert(exception);
  }
};

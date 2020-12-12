import {STATION} from '../../constants.js';

class StationList {
  template(station, i) {
    return `
      <tr>
        <td>${station}</td>
        <td>
          <button data-station-id=${i} class=${STATION.BUTTON.DELETE.CLASS}>삭제
          </button>
        </td>
      </tr>
    `;
  }
}

const stationList = new StationList();

export default stationList;

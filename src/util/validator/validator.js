import { STATION_FETCH_URL } from '../../library/constant/constant.js';

export default class Validator {
  checkStationName(name) {
    const stationData = this.getStationData();

    return stationData.then(data => {
      for (const stationInfo of data) {
        if (name === stationInfo.STATION_NM) {
          return true;
        }
      }

      return false;
    });
  }

  getStationData() {
    return fetch(STATION_FETCH_URL)
      .then(response => response.json())
      .then(data => {
        const {
          SearchSTNBySubwayLineInfo: { row },
        } = data;

        return row;
      });
  }
}

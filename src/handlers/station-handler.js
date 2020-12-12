import StationListener
  from '../listeners/subway-station/station-listener.js';
import SubwayStation from '../main/subway-station.js';
import {renderSubWayStation} from '../views/subway-station-view.js';

class StationHandler {
  handleStation() {
    const subwayStation = new SubwayStation();

    renderSubWayStation(subwayStation.stationList);

    new StationListener(subwayStation);
  }
}

const stationHandler = new StationHandler();

export const {
  handleStation,
} = stationHandler;

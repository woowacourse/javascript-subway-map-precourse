import {STATION, STORAGE} from '../constants.js';
import StationListener from '../listeners/station-listener.js';
import SubwayStation from '../main/subway-station.js';
import {saveList} from '../main/subway-local-storage.js';
import {
  renderSubWayStation, renderAddStation, renderDeleteStation,
} from '../views/subway-station-view.js';

class StationHandler {
  handleInitStation() {
    const subwayStation = new SubwayStation();

    renderSubWayStation(subwayStation.stationList);

    new StationListener(subwayStation);
  }

  handleAddStation(subwayStation) {
    const station = document.getElementById(STATION.INPUT.ID).value.trim();

    subwayStation.addStation(station, (err, stationList) => {
      if (err) return alert(err);

      saveList(STORAGE.STATION.KEY, stationList);
      renderAddStation(station);
    });
  }

  handlerDeleteStation(subwayStation, target) {
    const targetId = target.dataset.stationId;

    if (!confirm(STATION.ALERT.DELETE)) return;

    subwayStation.deleteStation(targetId, (err, stationList) => {
      if (err) return alert(err);

      saveList(STORAGE.STATION.KEY, stationList);
      renderDeleteStation(targetId);
    });
  }
}

const stationHandler = new StationHandler();

export const {
  handleInitStation,
  handleAddStation,
  handlerDeleteStation,
} = stationHandler;

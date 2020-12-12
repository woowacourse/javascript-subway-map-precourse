import {REGISTER, RESULT, STATION} from '../constants.js';
import StationRegisterComponent
  from '../components/subway-station/station-register.js';
import StationResultComponent
  from '../components/subway-station/station-result.js';
import StationList
  from '../components/subway-station/station-list.js';

class SubwayStationView {
  constructor() {
    this.register = document.getElementById(REGISTER.ID);
    this.result = document.getElementById(RESULT.ID);
  }

  renderSubWayStation = (stationList) => {
    this.register.innerHTML = StationRegisterComponent.template();
    this.result.innerHTML = StationResultComponent.template();

    this.renderStationList(stationList);
  }

  renderStationList = (stationList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    stationList.forEach((station, i)=>{
      tbody.innerHTML += StationList.template(station, i);
    });
  }

  renderStation = (stationList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    document.getElementById(STATION.INPUT.ID).value = '';

    tbody.innerHTML += StationList.template(
        stationList[stationList.length - 1],
        tbody.rows.length,
    );
  }
}

export const {
  renderSubWayStation,
  renderStationList,
  renderStation,
} = new SubwayStationView();

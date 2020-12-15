import {MAIN, STATION} from '../constants.js';
import {
  registerTemplate, resultTemplate, listTemplate,
} from '../components/station-component.js';

class SubwayStationView {
  constructor() {
    this.main = document.getElementById(MAIN.ID);
  }

  renderSubWayStation = (stationList) => {
    this.main.innerHTML = registerTemplate();

    this.result = document.getElementById(STATION.DIV.RESULT.ID);

    if (stationList.length > 0) {
      this.result.innerHTML = resultTemplate();
      this.renderStationList(stationList);
    }
  }

  renderStationList = (stationList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    stationList.forEach((station, i)=>{
      tbody.innerHTML += listTemplate(station, i);
    });
  }

  renderAddStation = (station) => {
    if (this.result.innerHTML === '') this.result.innerHTML = resultTemplate();

    const tbody = this.result.getElementsByTagName('tbody')[0];
    document.getElementById(STATION.INPUT.ID).value = '';

    tbody.innerHTML += listTemplate(
        station,
        tbody.rows.length,
    );
  }

  renderDeleteStation = (targetId) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    tbody.removeChild(tbody.children[targetId]);

    const deleteButtons
    = this.result.getElementsByClassName(STATION.BUTTON.DELETE.CLASS);

    Array.prototype.forEach.call(deleteButtons, (button, i) => {
      button.dataset.stationId = i;
    });

    if (tbody.children.length === 0) this.result.innerHTML = '';
  }
}

export const {
  renderSubWayStation,
  renderAddStation,
  renderDeleteStation,
} = new SubwayStationView();

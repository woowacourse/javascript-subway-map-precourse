import { DELETE_CONFIRM_MESSAGE } from '../../library/constants/confirm.js';
import { STATIONS } from '../../library/constants/localstorage.js';
import { HAS_SECTION_MESSAGE } from '../../library/constants/station-manager-alert.js';
import Component from '../../library/core/component.js';

class StationList extends Component {
  constructor($target, props) {
    super($target, props);
    this._props.stations.subscribe(this.render);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <h2>🚉 지하철 역 목록</h2>
      <table>
        <tr>
          <th>역 이름</th>
          <th>설정</th>
        <tr>
        ${this.createTableRowTemplate()}
      </table>
    `;
  }

  createTableRowTemplate() {
    let template = '';
    this._props.stations?.value.forEach(station => {
      template += `
        <tr data-key=${station}>
          <td>${station}</td>
          <td><button class="station-delete-button">삭제</button></td>
        </tr>
      `;
    });

    return template;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (
        event.target.classList.contains('station-delete-button') &&
        window.confirm(DELETE_CONFIRM_MESSAGE)
      ) {
        this.handleRemoveStationEvent(
          event.target.closest('[data-key]').dataset.key
        );
      }
    });
  }

  handleRemoveStationEvent(targetStation) {
    if (this.hasStationAsSection(targetStation)) {
      alert(HAS_SECTION_MESSAGE);
      return;
    }
    this.removeStation(targetStation);
  }

  hasStationAsSection(station) {
    const { lines } = this._props;
    let result = false;
    lines.value.forEach(line => {
      if (line.sections.includes(station)) {
        result = true;
      }
    });

    return result;
  }

  removeStation(target) {
    const { stations } = this._props;
    stations.value = stations.value.filter(station => station !== target);
    localStorage.setItem(STATIONS, JSON.stringify(stations.value));
  }
}

export default StationList;

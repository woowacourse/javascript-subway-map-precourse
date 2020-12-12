import Component from '../../library/core/component.js';

class StationList extends Component {
  constructor($target, props) {
    super($target, props);
    this._props.stations.subscribe(this.render);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `<h2>🚉 지하철 역 목록</h2>`;
    this._$target.innerHTML += this.createTableTemplate();
  }

  // eslint-disable-next-line max-lines-per-function
  createTableTemplate() {
    let tableTemplate = `
      <table>
        <tr>
          <th>역 이름</th>
          <th>설정</th>
        <tr>
      `;
    this._props.stations?.value.forEach(station => {
      tableTemplate += `
        <tr data-key=${station}>
          <td>${station}</td>
          <td><button class="station-delete-button">삭제</button></td>
        </tr>
      `;
    });
    return tableTemplate + `</table>`;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.classList.contains('station-delete-button')) {
        this.removeStation(event.target.closest('[data-key]').dataset.key);
      }
    });
  }

  removeStation(target) {
    this._props.stations.value = this._props.stations.value.filter(
      station => station !== target
    );
  }
}

export default StationList;

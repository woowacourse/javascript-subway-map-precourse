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

  createTableTemplate() {
    let tableTemplate = `<table>
                            <tr>
                              <th>역 이름</th>
                              <th>설정</th>
                            <tr>`;
    this._props.stations?.value.forEach(station => {
      tableTemplate += `<tr>
                          <td>${station}</td>
                          <td><button>삭제</button></td>
                        </tr>`;
    });
    return tableTemplate + `</table>`;
  }
}

export default StationList;

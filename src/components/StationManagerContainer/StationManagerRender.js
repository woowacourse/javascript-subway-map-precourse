import Component from "../../js/Component.js";
import { DOM_STATION } from "../../utils/constants.js";

export default class StationManagerRender extends Component {
  constructor(stateId) {
    super(stateId);
    console.log("--StationManagerRender--");
    this.initDOM();
    this.render();
  }

  initDOM() {
    this.stationNameInputElement = document.createElement("div");
    this.stationListElement = document.createElement("div");
  }

  render() {
    this.stationNameInputElement.innerHTML = this.stationNameInputRender();
    this.stationListElement.innerHTML = this.stationListRender();
    this._app.append(this.stationNameInputElement, this.stationListElement);
    this.stationListTrRender(this.stations);
  }

  stationNameInputRender() {
    return `  
      <label for=${DOM_STATION.STATION_NAME_INPUT_ID}>역 이름</label>
      <form id=${DOM_STATION.STATION_FORM_ID}>
        <input type="text" id=${DOM_STATION.STATION_NAME_INPUT_ID} placeholder="역 이름을 입력해 주세요" autocomplete="off"/>
        <button id=${DOM_STATION.STATION_ADD_BUTTON_ID}>역 추가</button>
      </form>
    `;
  }

  stationListRender() {
    return `
      <h2>🚉 지하철 역 목록</h2>
      <table>
        <thead>
          <th>역 이름</th>
          <th>설정</th>
        </thead>
        <tbody id=${DOM_STATION.STATION_LIST_TBODY_ID}></tbody>
      </table>
    `;
  }

  stationListTrRender(info) {
    const tbody = document.getElementById(DOM_STATION.STATION_LIST_TBODY_ID);

    info.forEach((station) => {
      const tr = document.createElement("tr");
      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");

      tr.dataset.stationName = station;
      tr.innerHTML = `
      <td>${station}</td>
      `;
      deleteBtn.innerText = "삭제";
      deleteBtn.setAttribute("class", DOM_STATION.STATION_DELETE_BUTTON_CLASS);
      deleteTd.appendChild(deleteBtn);
      tr.appendChild(deleteTd);
      tbody.appendChild(tr);

      deleteBtn.addEventListener("click", (e) => this._onClickDeleteTr(e));
    });
  }

  _onClickDeleteTr(e) {}
}

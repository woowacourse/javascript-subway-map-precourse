import Component from "../../js/Component.js";
import { DOM_LINE } from "../../utils/constants.js";

export default class LineManagerRender extends Component {
  constructor(stateId) {
    super(stateId);
    this.initDOM();
    this.render();
  }

  initDOM() {
    this.lineInputElement = document.createElement("div");
    this.lineListElement = document.createElement("div");
  }

  render() {
    this.lineInputElement.innerHTML = this.lineInputRender();
    this.lineListElement.innerHTML = this.lineListRender();
    this._app.append(this.lineInputElement, this.lineListElement);
    this.lineListTrRender(this.lines);
  }

  lineInputRender() {
    return `
    <label for=${DOM_LINE.LINE_NAME_INPUT_ID}>노선 이름</label>
    <form id=${DOM_LINE.LINE_NAME_FORM_ID}>
      <input type="text" id=${
        DOM_LINE.LINE_NAME_INPUT_ID
      } placeholder="노선 이름을 입력해 주세요" autocomplete="off"/>
      <div>
        <label for=${DOM_LINE.LINE_START_STATION_SELECTOR_ID}>상행 종점</label>
        <select name="start-station" id=${
          DOM_LINE.LINE_START_STATION_SELECTOR_ID
        }>
          ${this.selectorOptionRender()}
        </select>
      </div>
      <div>
        <label for=${DOM_LINE.LINE_END_STATION_SELECTOR_ID}>하행 종점</label>
        <select name="end-station" id=${DOM_LINE.LINE_END_STATION_SELECTOR_ID}>
          ${this.selectorOptionRender()}
        </select>
      </div>
      <button id=${DOM_LINE.LINE_ADD_BUTTON_ID}>노선 추가</button>
    </form>
    `;
  }

  selectorOptionRender() {
    let selectorInnerHTML = ``;

    this.stations.forEach((station) => {
      selectorInnerHTML += `
      <option value=${station}>${station}</option>
      `;
    });

    return selectorInnerHTML;
  }

  lineListRender() {
    return `
    <h2>🚉 지하철 역 목록</h2>
    <table>
      <thead>
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
      </thead>
      <tbody id=${DOM_LINE.LINE_LIST_TBODY_ID}></tbody>
    </table>
  `;
  }

  lineListTrRender(info) {
    const tbody = document.getElementById(DOM_LINE.LINE_LIST_TBODY_ID);

    info.forEach((lineInfo) => {
      const tr = document.createElement("tr");
      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");

      tr.dataset.lineName = lineInfo.lineName;
      tr.innerHTML = `
      <td>${lineInfo.lineName}</td>
      <td>${lineInfo.line[0]}</td>
      <td>${lineInfo.line[lineInfo.line.length - 1]}</td>
      `;

      deleteBtn.innerText = "삭제";
      deleteBtn.setAttribute("class", DOM_LINE.LINE_DELETE_BUTTON_CLASS);
      deleteTd.appendChild(deleteBtn);
      tr.appendChild(deleteTd);
      tbody.appendChild(tr);

      deleteBtn.addEventListener("click", (e) => this._onClickDeleteLineTr(e));
    });
  }
}

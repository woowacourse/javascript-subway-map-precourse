import Component from "../../js/Component.js";
import { DOM_SECTION } from "../../utils/constants.js";

export default class SectionManagerRender extends Component {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManagerRender--");
    this.initDOM();
    this.render();
  }

  initDOM() {
    this.sectionLineMenu = document.createElement("div");
    this.enrollSection = document.createElement("div");
  }

  render() {
    this.sectionLineMenu.innerHTML = this.sectionLineMenuNavRender();

    this._app.append(this.sectionLineMenu, this.enrollSection);
    this.sectionLineMenuButtonRender();
  }

  sectionLineMenuNavRender() {
    return `
      <h2>구간을 수정할 노선을 선택해주세요</h2>
      <div id=${DOM_SECTION.SECTION_LINE_MENU_NAV_ID}></div>
    `;
  }

  sectionLineMenuButtonRender() {
    this.sectionLineMenuNav = document.getElementById(
      DOM_SECTION.SECTION_LINE_MENU_NAV_ID
    );

    this.lines.forEach((lineInfo, index) => {
      const menuBtn = document.createElement("button");
      menuBtn.dataset.lineName = lineInfo.lineName;
      menuBtn.dataset.lines = JSON.stringify(lineInfo.line);
      menuBtn.dataset.index = index;
      menuBtn.innerText = lineInfo.lineName;
      menuBtn.setAttribute("class", DOM_SECTION.SECTION_LINE_MENU_BUTTON_CLASS);
      menuBtn.addEventListener("click", (e) => this._onClickMenuLine(e));

      this.sectionLineMenuNav.appendChild(menuBtn);
    });
  }

  _onClickMenuLine(e) {
    const selectedMenuDataset = e.target.dataset;
    this.enrollSection.innerHTML = this.sectionLineManagerRender(
      selectedMenuDataset
    );
  }

  sectionLineManagerRender(dataset) {
    return `
    <h2>${dataset.lineName} 관리</h2>
    <h3>구간 등록</h3>
    <form id=${DOM_SECTION.SECTION_ADD_FORM_ID}>
      <select name="stations" id=${DOM_SECTION.SECTION_STATION_SELECTOR_ID}>
        ${this.sectionSelectorOptionRender()}
      </select>
      <input type="number" id=${
        DOM_SECTION.SECTION_ORDER_INPUT_ID
      } placeholder="순서"/>
      <button id=${DOM_SECTION.SECTION_ADD_BUTTON_ID}>등록</button>
    </form>
    <div>
      <table>
        <thead>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </thead>
        <tbody id=${DOM_SECTION.SECTION_DELETE_TBODY_ID}>
        </tbody>
      </table>
    </div>
    `;
  }

  sectionSelectorOptionRender() {
    let optionInnerHTML = ``;

    this.stations.forEach((station) => {
      optionInnerHTML += `
        <option value=${station}>${station}</option>
      `;
    });

    return optionInnerHTML;
  }
}

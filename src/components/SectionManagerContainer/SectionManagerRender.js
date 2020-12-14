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

    this._app.append(this.sectionLineMenu);
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

    this.lines.forEach((lineInfo) => {
      const menuBtn = document.createElement("button");
      menuBtn.dataset.lineName = lineInfo.lineName;
      menuBtn.innerText = lineInfo.lineName;
      menuBtn.setAttribute("class", DOM_SECTION.SECTION_LINE_MENU_BUTTON_CLASS);
      menuBtn.addEventListener("click", (e) => this._onClickMenuLine(e));

      this.sectionLineMenuNav.appendChild(menuBtn);
    });
  }

  _onClickMenuLine(e) {
    const selectedMenu = e.target.dataset.lineName;
    this.sectionLineManagerRender(selectedMenu);
  }

  sectionLineManagerRender(line) {
    console.log(line);
  }
}

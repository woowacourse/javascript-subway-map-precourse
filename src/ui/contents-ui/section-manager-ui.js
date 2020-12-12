export default class SectionManagerUI {
  constructor(contentsID, stationINFOManager) {
    this.contentsID_ = contentsID;
    this.stationINFOManager_ = stationINFOManager;
    this.sectionRegisterUI = null;
    this.setContentsHTML();
  }

  setContentsHTML() {
    document.getElementById(this.contentsID_).innerHTML = TEMPLATE;
    this.updateLineButtons_();
  }

  updateLineButtons_() {
    const buttonDiv = document.getElementById(SECTION_LINE_MENU_DIV_ID);
    const lineINFOs = this.stationINFOManager_.getLineINFOs();
    let buttonDivInnerHTML = "";
    lineINFOs.forEach(({ name }) => {
      buttonDivInnerHTML += this.makeNewSelectLineButtonHTML_(name);
    });
    buttonDiv.innerHTML = buttonDivInnerHTML;
    this.addEventToSelectLineButton_();
  }
  addEventToSelectLineButton_() {
    const buttons = document.querySelectorAll(
      "." + SECTION_LINE_MENU_BUTTON_CLASS
    );
    Array.prototype.forEach.call(buttons, (button) => {
      button.addEventListener("click", (e) => {
        this.sectionRegisterUI = new SectionRegisterUI(e.target.dataset.name);
      });
    });
  }
  makeNewSelectLineButtonHTML_(name) {
    return `
    <button class="${SECTION_LINE_MENU_BUTTON_CLASS}" data-name="${name}">${name}</button>
    `;
  }
}

class SectionRegisterUI {
  constructor(lineName) {
    this.lineName = lineName;
    this.setContentsHTML();
  }

  setContentsHTML() {
    const manageDiv = document.getElementById(SECTION_REGISTER_DIV_ID);
    manageDiv.innerHTML =
      this.makeTitleHTML(this.lineName) + SECTION_REGISTER_TEMPLATE;
  }
  makeTitleHTML(name) {
    return `<h2>${name} 관리<h2>`;
  }
}

const SECTION_REGISTER_DIV_ID = "section-register-div";
const SECTION_REGISTER_TEMPLATE = `
  <h3>구간 등록</h3>
  <p>
    <select id="section-station-selector">
    </select>
    <input type="text" id="section-order-input" placeholder="순서" />
    <button id="section-add-button">등록</button>
  </p>
  <table border="1">
    <th>순서</th>
    <th>이름</th>
    <th>설정</th>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>
        <button class="section-delete-button">노선에서 제거</button>
      </td>
    </tr>
  </table>
`;

const SECTION_LINE_MENU_DIV_ID = "section-line-menu-div";
const SECTION_LINE_MENU_BUTTON_CLASS = "section-line-menu-button";
const TEMPLATE = `
<h2>구간을 수정할 노선을 선택해주세요.</h2>
<div id="${SECTION_LINE_MENU_DIV_ID}">
</div>
<div id="${SECTION_REGISTER_DIV_ID}">
<div>
`;

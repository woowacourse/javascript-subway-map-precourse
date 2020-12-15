import {MAIN, SECTION} from '../constants.js';
import {
  choiceTemplate, registerTemplate, resultTemplate, listTemplate,
} from '../components/section-component.js';

class SubwaySectionView {
  constructor() {
    this.main = document.getElementById(MAIN.ID);
  }

  renderLineChoices = (lineList) => {
    this.main.innerHTML = choiceTemplate();
    this.result = document.getElementById(SECTION.DIV.RESULT.ID);
    const lineDiv = document.getElementById(SECTION.DIV.CHOICE.ID);

    if (Object.keys(lineList).length === 0) {
      lineDiv.innerHTML = '노선을 먼저 등록해주세요';
    } else {
      this.renderLineButtons(lineList, lineDiv);
    }
  }

  renderLineButtons = (lineList, lineDiv) => {
    lineDiv.innerHTML += `<h3> 구간을 수정할 노선을 선택해주세요.</h3>`;

    Object.keys(lineList).forEach((lineName) => {
      lineDiv.innerHTML += `
        <button class=${SECTION.BUTTON.LINE.CLASS} value=${lineName}>
          ${lineName}
        </button>
      `;
    });
  }

  renderSectionRegister = (stationList, lineName) => {
    const registerDiv = document.getElementById(SECTION.DIV.REGISTER.ID);

    registerDiv.innerHTML = registerTemplate(lineName);

    this.renderSelectList(stationList);
  }

  renderSectionResult = (section) => {
    this.result.innerHTML = resultTemplate();

    this.renderSectionList(section);
  }

  renderSelectList = (stationList) => {
    const lineSelect = document.getElementById(SECTION.SELECT.STATION.ID);

    stationList.forEach((station) => {
      const optionText = `<option>${station}</option>`;
      lineSelect.innerHTML += optionText;
    });
  }

  renderSectionList = (sectionList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    sectionList.forEach((section, i)=>{
      tbody.innerHTML += listTemplate(section.name, i);
    });
  }

  renderAddSection = (lineName, order) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];
    const row = tbody.insertRow(order);

    document.getElementById(SECTION.INPUT.ORDER.ID).value = '';
    row.innerHTML = listTemplate(lineName, order);

    this.rearrangeList(tbody);
  }

  rearrangeList(tbody) {
    const button
    = this.result.getElementsByClassName(SECTION.BUTTON.DELETE.CLASS);

    [...tbody.rows].forEach((row, i) => {
      row.children[0].innerHTML = i;
      button[i].dataset.sectionId = i;
    });
  }
}

export const {
  renderLineChoices,
  renderSectionRegister,
  renderSectionResult,
  renderAddSection,
} = new SubwaySectionView();

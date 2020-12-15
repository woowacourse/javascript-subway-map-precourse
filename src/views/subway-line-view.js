import {MAIN, LINE} from '../constants.js';
import {
  initTemplate, registerTemplate, resultTemplate, listTemplate,
} from '../components/line-component.js';

class SubwayLineView {
  constructor() {
    this.main = document.getElementById(MAIN.ID);
  }

  renderLineRegister = (stationList) => {
    this.main.innerHTML = initTemplate();
    this.result = document.getElementById(LINE.DIV.RESULT.ID);

    if (stationList.length === 0) return;

    const register = document.getElementById(LINE.DIV.REGISTER.ID);

    register.innerHTML = registerTemplate();
    this.renderSelectList(stationList);
  }

  renderLineResult = (lineList) => {
    if (Object.keys(lineList).length === 0) return;

    this.result.innerHTML = resultTemplate();
    this.renderLineList(lineList);
  }

  renderSelectList = (stationList) => {
    const startSelect = document.getElementById(LINE.SELECT.START.ID);
    const endSelect = document.getElementById(LINE.SELECT.END.ID);

    stationList.forEach((station) => {
      const optionText = `<option>${station}</option>`;

      startSelect.innerHTML += optionText;
      endSelect.innerHTML += optionText;
    });
  }

  renderLineList = (lineList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    Object.keys(lineList).forEach((lineName, i) => {
      tbody.innerHTML += listTemplate(lineName, lineList[lineName]);
    });
  }

  renderAddLine = (lineList, lineName) => {
    if (this.result.innerHTML === '') this.result.innerHTML = resultTemplate();

    const tbody = this.result.getElementsByTagName('tbody')[0];

    document.getElementById(LINE.INPUT.ID).value = '';
    tbody.innerHTML += listTemplate(lineName, lineList[lineName]);
  }

  renderDeleteLine = (lineName) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    [...tbody.rows].forEach((row) => {
      if (row.children[0].textContent === lineName) tbody.removeChild(row);
    });

    if (tbody.children.length === 0) this.result.innerHTML = '';
  }
}

export const {
  renderLineRegister,
  renderLineResult,
  renderAddLine,
  renderDeleteLine,
} = new SubwayLineView();

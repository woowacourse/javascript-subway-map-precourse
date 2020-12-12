import {REGISTER, RESULT, LINE} from '../constants.js';
import LineRegisterComponent
  from '../components/subway-line/line-register.js';
import LineResultComponent
  from '../components/subway-line/line-result.js';
import LineList
  from '../components/subway-line/line-list.js';

class SubwayLineView {
  constructor() {
    this.register = document.getElementById(REGISTER.ID);
    this.result = document.getElementById(RESULT.ID);
  }

  renderSubWayLine = (stationList, lineList) => {
    this.register.innerHTML = LineRegisterComponent.template();
    this.result.innerHTML = LineResultComponent.template();

    this.renderSelectList(stationList);
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

    tbody.innerHTML = '';

    lineList.forEach((line, i)=>{
      tbody.innerHTML += LineList.template(line, i);
    });
  }

  renderLine = (lineList) => {
    const tbody = this.result.getElementsByTagName('tbody')[0];

    document.getElementById(LINE.INPUT.ID).value = '';

    tbody.innerHTML += LineList.template(
        lineList[lineList.length - 1],
        tbody.rows.length,
    );
  }
}

export const {
  renderSubWayLine,
  renderLineList,
  renderLine,
} = new SubwayLineView();

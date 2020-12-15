import {STATION} from '../constants.js';

class StationComponent {
  registerTemplate() {
    return `
      <div id=${STATION.DIV.REGISTER.ID}>
        <b>역 이름</b><br>
        <input id=${STATION.INPUT.ID} placeholder="역 이름을 입력해주세요."></input>
        <button id=${STATION.BUTTON.ADD.ID}>역 추가</button>
      </div>
      <div id=${STATION.DIV.RESULT.ID}></div>
    `;
  }

  resultTemplate() {
    return `
        <h2>🚉 지하철 역 목록</h2>
        <table>
          <thead>
            <tr>
              <th>역 이름</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    `;
  }

  listTemplate(station, i) {
    return `
      <tr>
        <td>${station}</td>
        <td>
          <button data-station-id=${i} class=${STATION.BUTTON.DELETE.CLASS}>
            삭제
          </button>
        </td>
      </tr>
    `;
  }
}

const stationComponent = new StationComponent();

export const {
  registerTemplate, resultTemplate, listTemplate,
} = stationComponent;

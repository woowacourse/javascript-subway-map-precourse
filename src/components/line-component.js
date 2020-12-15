import {LINE} from '../constants.js';

class LineComponent {
  initTemplate() {
    return `
      <div id=${LINE.DIV.REGISTER.ID}>
        역을 먼저 등록해주세요
      </div>
      <div id=${LINE.DIV.RESULT.ID}></div>
    `;
  }

  registerTemplate() {
    return `
      <b>노선 이름</b><br>
      <input id=${LINE.INPUT.ID} placeholder="노선 이름을 입력해주세요"></input><br>
      <br>
      상행 종점 <select id=${LINE.SELECT.START.ID}></select><br>
      하행 종점 <select id=${LINE.SELECT.END.ID}></select><br>
      <br>
      <button id=${LINE.BUTTON.ADD.ID}>노선 추가</button>
    `;
  }

  resultTemplate() {
    return `
        <h2>🚉 지하철 노선 목록</h2>
        <table>
          <thead>
            <tr>
              <th>노선 이름</th>
              <th>상행 종점역</th>
              <th>하행 종점역</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    `;
  }

  listTemplate(lineName, line) {
    return `
      <tr>
        <td>${lineName}</td>
        <td>${line[0].name}</td>
        <td>${line[line.length - 1].name}</td>
        <td>
          <button data-line-name=${lineName} class=${LINE.BUTTON.DELETE.CLASS}>
            삭제
          </button>
        </td>
      </tr>
    `;
  }
}

const lineComponent = new LineComponent();

export const {
  initTemplate, registerTemplate, resultTemplate, listTemplate,
} = lineComponent;

import {SECTION} from '../constants.js';

class SectionComponent {
  choiceTemplate() {
    return `
      <div id=${SECTION.DIV.CHOICE.ID}></div>
      <div id=${SECTION.DIV.REGISTER.ID}></div>
      <br>
      <div id=${SECTION.DIV.RESULT.ID}></div>
    `;
  }

  registerTemplate(name) {
    return `
      <h2>${name} 관리</h2>
      <h3>구간 등록</h3>
      <select id=${SECTION.SELECT.STATION.ID}></select>
      <input type="number" id=${SECTION.INPUT.ORDER.ID} placeholder="순서">
      </input>
      <button id=${SECTION.BUTTON.ADD.ID}>등록</button>
    `;
  }

  resultTemplate() {
    return `
    <table>
        <thead>
          <tr>
            <th>순서</th>
            <th>이름</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
  }

  listTemplate(name, i) {
    return `
      <td>${i}</td>
      <td>${name}</td>
      <td>
        <button 
          data-section-id=${i} 
          class=${SECTION.BUTTON.DELETE.CLASS}>
          노선에서 제거
        </button>
      </td>
    `;
  }
}

const sectionComponent = new SectionComponent();

export const {
  choiceTemplate, registerTemplate, resultTemplate, listTemplate,
} = sectionComponent;

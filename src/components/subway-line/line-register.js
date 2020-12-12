import {LINE} from '../../constants.js';

class LineRegister {
  template() {
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
}

const lineRegister = new LineRegister();

export default lineRegister;

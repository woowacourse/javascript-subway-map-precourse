import {LINE} from '../constants.js';
import {handleAddLine, handleDeleteLine} from '../handlers/line-handler.js';

export default class LineListener {
  constructor(subwayLine) {
    this.subwayLine = subwayLine;

    this.addListenerToRegister();
    this.addListenerToResult();
  }

  addListenerToRegister() {
    const register = document.getElementById(LINE.DIV.REGISTER.ID);

    register.addEventListener('click', (event) => {
      if (event.target.id === LINE.BUTTON.ADD.ID) {
        handleAddLine(this.subwayLine);
      }
    });
  }

  addListenerToResult() {
    const result = document.getElementById(LINE.DIV.RESULT.ID);

    result.addEventListener('click', (event) => {
      if (event.target.className === LINE.BUTTON.DELETE.CLASS) {
        handleDeleteLine(this.subwayLine, event.target);
      }
    });
  }
}

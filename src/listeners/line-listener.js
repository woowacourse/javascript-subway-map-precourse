import {LINE} from '../constants.js';

export default class LineListener {
  constructor(subwayLine) {
    this.subwayLine = subwayLine;
    this.setElement();
    this.addEventListener();
  }

  setElement() {
    this.lineAddButton = document.getElementById(LINE.BUTTON.ADD.ID);
  }

  addEventListener() {
    this.lineAddButton
        .addEventListener('click', this.subwayLine.addLine);

    document.addEventListener('click', (event)=>{
      if (event.target.className === LINE.BUTTON.DELETE.CLASS) {
        this.subwayLine.deleteLine(event.target);
      }
    });
  }
}

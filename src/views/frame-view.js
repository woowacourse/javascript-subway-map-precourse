import {frameTemplate, globalStyle} from '../components/frame.js';

export default class FrameView {
  constructor(app) {
    globalStyle();

    app.innerHTML += frameTemplate();
  }
}

new FrameView(document.getElementById('app'));

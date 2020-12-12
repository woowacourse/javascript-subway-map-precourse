import Frame from '../components/frame.js';

export default class FrameView {
  constructor(app) {
    app.innerHTML += Frame.template();
  }
}

new FrameView(document.getElementById('app'));

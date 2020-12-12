import initEvent from './event/initEvent.js';
import render from './render/render.js';

export default function SubwayManagerApp() {
  render();
  initEvent();
}

new SubwayManagerApp();

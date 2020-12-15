import initEvent from './controller/initEvent.js';
import render from './render/render.js';

export default function SubwayManagerApp() {
  render();
  initEvent();
}

new SubwayManagerApp();

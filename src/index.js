import initEvent from './event/initEvent.js';
import render from './render/render.js';

export default function SubwayMapManagerApp() {
  render();
  initEvent();
}

new SubwayMapManagerApp();

import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
}

import MenuView from './Menu/MenuView.js';
import MenuController from './Menu/MenuController.js';

export default class SubwayManager {
  constructor() {
    MenuView.menuButtonListView();
    MenuController.buttonEventController();
  }
}

new SubwayManager();

import MenuView from './Menu/MenuView.js';
import MenuController from './Menu/MenuController.js';

MenuView.MenuButtonListView();
MenuController.ButtonEventController();

localStorage.setItem('Stations', ['인천', '서울역', '신도림', '소요산']);
localStorage.setItem('Lines', ['1호선', '2호선', '3호선']);

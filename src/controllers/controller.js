import StationLayout from '../layout/stationLayout.js';

export default class Controller {
  constructor() {
    this.viewList = {
      station: new StationLayout(this),
    };
    this.currentView = '';
    this.currentView = this.viewList.station;
  }

  /**
   * view 안 input 태그를 찾아 값을 반환한다
   * @param {PageLayout} view
   */
  getInputFromUser(view) {
    return view.elements.inputContainer.querySelector('input').value;
  }

  setCurrentView(view) {
    this.currentView = this.replaceCurrentView(view);
  }

  replaceCurrentView(view) {
    const currentSection = document.querySelector('section');
    currentSection.replaceWith(view.elements.section);

    return view;
  }
}

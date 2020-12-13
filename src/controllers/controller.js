import StationLayout from '../layout/stationLayout.js';
import StationModel from '../model/stationModel.js';

export default class Controller {
  constructor() {
    // TODO: model을 여기서 초기화하는게 맞나?
    this.modelList = { station: new StationModel() };
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

  addStationData(station) {
    this.modelList.station.addData(station);
  }
}

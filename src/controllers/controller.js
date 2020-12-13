import StationLayout from '../layout/stationLayout.js';
import StationModel from '../model/stationModel.js';
import LineLayout from '../layout/lineLayout.js';

export default class Controller {
  constructor() {
    // TODO: model을 여기서 초기화하는게 맞나?
    this.modelList = { station: new StationModel() };
    this.viewList = {
      station: new StationLayout(this),
      line: new LineLayout(this),
    };
    console.log('new controller: ');
    console.log(this.viewList);
    this.currentView = '';
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

  insertStationData(stationName) {
    this.modelList.station.insertData(stationName);
  }

  deleteStationData(stationName) {
    this.modelList.station.deleteData(stationName);
  }
}

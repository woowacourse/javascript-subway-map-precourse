import StationLayout from '../layout/stationLayout.js';
import StationModel from '../model/stationModel.js';
import LineLayout from '../layout/lineLayout.js';
import SectionLayout from '../layout/sectionLayout.js';
import LineModel from '../model/lineModel.js';
import MapPrintLayout from '../layout/mapPrintLayout.js';

export default class Controller {
  constructor() {
    this.modelList = { station: new StationModel(), line: new LineModel() };
    this.viewList = {
      station: new StationLayout(this),
      line: new LineLayout(this),
      section: new SectionLayout(this),
      mapPrint: new MapPrintLayout(this),
    };
    this.currentView = '';
  }

  /**
   * view 안 input 태그를 찾아 값을 반환한다
   * @param {PageLayout} view
   */
  getInputFromUser(view) {
    return view.rendered.querySelector('input').value;
  }

  setCurrentView(view) {
    this.currentView = this.replaceCurrentView(view);
  }

  replaceCurrentView(view) {
    const currentSection = document.querySelector('section');
    currentSection.replaceWith(view.elements.section.$el);

    return view;
  }

  insertStationData(stationName) {
    this.modelList.station.insertData(stationName);
  }

  deleteStationData(stationName) {
    this.modelList.station.deleteData(stationName);
  }

  insertLineData(line, start, end) {
    const nodes = this.modelList.line.insertData(line, start, end);
    this.modelList.station.updateData(nodes);
  }

  deleteLineData(lineName) {
    const nodes = this.modelList.line.deleteData(lineName);
    this.modelList.station.updateData(nodes);
  }

  getLineListAll() {
    return this.modelList.line.getLineListAll();
  }

  getLineList(lineName) {
    return this.modelList.line.getLineList(lineName);
    // return this.modelList.line.getLineListAll().find(row => row[0].line === lineName);
  }

  deleteSectionData(index, lineName, stationName) {
    const node = this.modelList.line.deleteSectionData(index, lineName);
    this.modelList.station.updateData(node);
  }

  insertSectionData(index, lineName, stationName) {
    const node = this.modelList.line.insertSectionData(
      index,
      lineName,
      stationName,
    );
    this.modelList.station.updateData([node]);
  }

  getStationListAll() {
    return this.modelList.station.getList();
  }
}

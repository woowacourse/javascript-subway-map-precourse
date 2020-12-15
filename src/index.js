import { deleteStation } from './controllers/stationManager.js';
import { deleteLine } from './controllers/lineManager.js';
import { deleteSection } from './controllers/sectionManager.js';
import { saveData, loadData } from './controllers/storage.js';
import { tabController } from './controllers/tab.js';
import Line from './models/Line.js';
import { showSectionManager } from './views/sectionManager.js';

export default function SubwayMap() {
  this.stationList = loadData('stations');
  this.lineList = loadData('lines');

  this.addStation = name => {
    this.stationList.push(name);
    this.saveStation();
  };

  this.delStation = name => {
    const index = this.stationList.findIndex(stationName => stationName === name);
    this.stationList.splice(index, 1);
    this.saveStation();
  };

  this.addLine = (name, start, end) => {
    this.lineList.push(new Line(name, start, end));
    this.saveLine();
  };

  this.delLine = name => {
    const index = this.lineList.findIndex(element => element.name === name);
    this.lineList.splice(index, 1);
    this.saveLine();
  };

  this.addSection = (lineIndex, order, name) => {
    this.lineList[lineIndex].list.splice(order, 0, name);
    this.saveLine();
  };

  this.delSection = (lineName, stationName) => {
    const lineIndex = this.lineList.findIndex(element => element.name === lineName);
    const { list } = this.lineList[lineIndex];
    const stationIndex = list.findIndex(name => name === stationName);
    list.splice(stationIndex, 1);
    this.saveLine();
  };

  this.reload = () => {
    this.stationList = loadData('stations');
    this.lineList = loadData('lines');
  };

  this.saveStation = () => {
    saveData('stations', this.stationList);
  };

  this.saveLine = () => {
    saveData('lines', this.lineList);
  };
}

const init = subwayMap => {
  tabController(subwayMap);
};

const subwayMap = new SubwayMap();
const newBtnAddListener = event => {
  if (event.target.classList.contains('station-delete-button')) {
    deleteStation(event.target.dataset.stationName, subwayMap);
  }
  if (event.target.classList.contains('line-delete-button')) {
    deleteLine(event.target.dataset.lineName, subwayMap);
  }
  if (event.target.classList.contains('section-line-menu-button')) {
    showSectionManager(event.target.dataset.lineName, subwayMap);
  }
  if (event.target.classList.contains('section-delete-button')) {
    const [line, station] = event.target.dataset.lineStation.split(',');
    deleteSection(line, station, subwayMap);
  }
};
document.body.addEventListener('click', newBtnAddListener);
init(subwayMap);

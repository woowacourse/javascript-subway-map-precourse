import { deleteStation } from './controllers/stationManager.js';
import { saveData, loadData } from './controllers/storage.js';
import { tabController } from './controllers/tab.js';
import { Line } from './models/Line.js';

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
};
document.body.addEventListener('click', newBtnAddListener);
init(subwayMap);

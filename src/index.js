import { deleteStation } from './controllers/stationManager.js';
import { saveData, loadData } from './controllers/storage.js';
import { tabController } from './controllers/tab.js';

export default function SubwayMap() {
  this.stationList = loadData('stations');
  this.LineList = loadData('lines');

  this.addStation = name => {
    this.stationList.push(name);
    this.saveAll();
  };

  this.delStation = name => {
    const index = this.stationList.findIndex(stationName => stationName === name);
    this.stationList.splice(index, 1);
    this.saveAll();
  };

  this.reload = () => {
    this.stationList = loadData('stations');
    this.LineList = loadData('lines');
  };

  this.saveAll = () => {
    saveData('stations', this.stationList);
    saveData('lines', this.LineList);
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

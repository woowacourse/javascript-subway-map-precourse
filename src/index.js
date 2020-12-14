import { tabController } from './controllers/tab.js';
import { saveData, loadData } from './controllers/storage.js';

export default function SubwayMap() {
  this.stationList = loadData('stations');
  this.LineList = loadData('lines');

  this.addStation = name => {
    this.stationList.push(name);
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
init(subwayMap);

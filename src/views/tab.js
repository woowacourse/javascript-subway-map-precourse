import { showAddedStation } from './stationManager.js';
import { showLineStationSelector, showAddedLine } from './lineManager.js';
import { showModifyLineBtn, hideSectionManager } from './sectionManager.js';
import { showMap } from './map.js';

const stationManagerScreen = document.querySelector('#station-manager-screen');
const lineManagerScreen = document.querySelector('#line-manager-screen');
const sectionManagerScreen = document.querySelector('#section-manager-screen');
const mapPrintManagerScreen = document.querySelector('#map-print-manager-screen');

const tabList = [
  stationManagerScreen,
  lineManagerScreen,
  sectionManagerScreen,
  mapPrintManagerScreen,
];

export const tabManager = (value, subwayMap) => {
  for (let i = 0; i < tabList.length; i++) {
    if (i == parseInt(value)) {
      tabList[i].classList.add('active');
    } else {
      tabList[i].classList.remove('active');
    }
    hideSectionManager();
  }
  subwayMap.reload();
  showAddedStation(subwayMap);
  showAddedLine(subwayMap);
  showLineStationSelector(subwayMap);
  showModifyLineBtn(subwayMap);
  showMap(subwayMap);
};

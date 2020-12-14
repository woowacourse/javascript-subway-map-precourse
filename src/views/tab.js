import { showAddedStation } from './stationManager.js';
import { showStationSelector, showAddedLine } from './lineManager.js';
import { showModifyLineBtn } from './sectionManager.js';
import { hideSectionManager } from './sectionManager.js';

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
  showStationSelector(subwayMap);
  showModifyLineBtn(subwayMap);
};

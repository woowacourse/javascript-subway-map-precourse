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

export const tabController = value => {
  for (let i = 0; i < tabList.length; i++) {
    if (i == parseInt(value)) {
      tabList[i].classList.add('active');
    } else {
      tabList[i].classList.remove('active');
    }
  }
};

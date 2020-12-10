export const DOMs = {
  stationManagerButton: document.getElementById('station-manager-button'),
  lineManagerButton: document.getElementById('line-manager-button'),
  sectionManagerButton: document.getElementById('section-manager-button'),
  mapPrintManagerButton: document.getElementById('map-print-manager-button'),
  managerContainer: document.getElementById('manager-container'),
};

export const DOMCtrl = {
  clearManagerContainer() {
    DOMs.managerContainer.innerHTML = '';
  },
};

import MenuView from './MenuView.js';

export default class MenuController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      if (eventId === 'station-manager-button') {
        MenuView.stationManagerView();
      }
      if (eventId === 'line-manager-button') {
        MenuView.lineManagerView();
      }
      if (eventId === 'section-manager-button') {
        MenuView.sectionManagerView();
      }
      if (eventId === 'map-print-manager-button') {
        MenuView.mapPrintManagerView();
      }
    });
  }
}

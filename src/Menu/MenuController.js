import MenuView from './MenuView.js';

export default class MenuController {
  static ButtonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      if (eventId === 'station-manager-button') {
        MenuView.StationManagerView();
      }
      if (eventId === 'line-manager-button') {
        MenuView.LineManagerView();
      }
      if (eventId === 'section-manager-button') {
        MenuView.SectionManagerView();
      }
      if (eventId === 'map-print-manager-button') {
        MenuView.MapPrintManagerView();
      }
    });
  }
}

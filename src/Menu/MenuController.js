import MenuView from './MenuView.js';
import StationManagerController from '../StationManger/StationManagerController.js';
import LineManagerController from '../LineManger/LineManagerController.js'
import SectionManagerController from '../SectionManager/SectionManagerController.js';

export default class MenuController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      if (eventId === 'station-manager-button') {
        MenuView.stationManagerView();
        StationManagerController.buttonEventController();
      }
      if (eventId === 'line-manager-button') {
        MenuView.lineManagerView();
        LineManagerController.buttonEventController();
      }
      if (eventId === 'section-manager-button') {
        MenuView.sectionManagerView();
        SectionManagerController.buttonEventController();
      }
      if (eventId === 'map-print-manager-button') {
        MenuView.mapPrintManagerView();
      }
    });
  }
}

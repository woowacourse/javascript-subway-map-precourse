import StationManagerView from './StationManagerView.js';
import StationManagerModel from './StationManagerModel.js';

export default class StationManagerController {
  static ButtonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      if (eventId === 'station-add-button') {
        this.addButtonClicked();
      } else if (eventId === 'station-delete-button') {
        this.deleteButtonClicked();
      }
    });
  }

  static addButtonClicked() {
    const station = document.getElementById('station-name-input').value;
    if (!StationManagerModel.isValidName(station)) {
      StationManagerView.alertNameError();
      StationManagerView.StationInputView();
      return;
    }
    StationManagerModel.add(station);
    StationManagerView.StationInputView();
    StationManagerView.StationTableView();
  }

  static deleteButtonClicked() {
    alert('delete');
  }
}

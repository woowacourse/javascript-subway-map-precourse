import StationManagerView from './StationManagerView.js';
import StationManagerModel from './StationManagerModel.js';
import StationErrorMsg from './StationErrorMsg.js';

export default class StationManagerController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      const eventClassName = event.target.className;
      if (eventId === 'station-add-button') {
        this.addButtonClicked();
      } else if (eventClassName === 'station-delete-button') {
        const button = event.path[0];
        this.deleteButtonClicked(button);
      }
    });
  }

  static addButtonClicked() {
    const station = document.getElementById('station-name-input').value;
    const isValid = StationManagerModel.isValidName(station);
    if (isValid !== 1) {
      StationManagerView.alertNameError(isValid);
      StationManagerView.stationInputView();
      return;
    }
    StationManagerModel.add(station);
    StationManagerView.stationInputView();
    StationManagerView.stationTableView();
  }

  static deleteButtonClicked(button) {
    const buttons = document.getElementsByClassName('station-delete-button');
    const buttonsArray = Array.from(buttons);
    const station = buttons[buttonsArray.indexOf(button)].dataset.deleteTarget;
    const isValid = StationManagerModel.checkAfterDelete(station);
    if (isValid !== 1) {
      StationManagerView.alertNameError(isValid);
      return;
    }
    if (!StationManagerView.confirmDelete()) {
      StationManagerView.alertNameError(-7);
      return;
    }
    StationManagerModel.delete(station);
    StationManagerView.stationTableView();
  }
}

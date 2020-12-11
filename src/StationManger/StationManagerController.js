import StationManagerView from './StationManagerView.js';
import StationManagerModel from './StationManagerModel.js';

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
    if (!StationManagerModel.isValidName(station)) {
      StationManagerView.alertNameError();
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
    if (StationManagerView.confirmDelete()) {
      StationManagerModel.delete(station);
      StationManagerView.stationTableView();
    }
  }
}

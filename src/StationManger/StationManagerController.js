import StationManagerView from './StationManagerView.js';
import StationManagerModel from './StationManagerModel.js';

export default class StationManagerController {
  static ButtonEventController() {
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
      StationManagerView.StationInputView();
      return;
    }
    StationManagerModel.add(station);
    StationManagerView.StationInputView();
    StationManagerView.StationTableView();
  }

  static deleteButtonClicked(button) {
    const buttons = document.getElementsByClassName('station-delete-button');
    const buttonsArray = Array.from(buttons);
    const station = buttons[buttonsArray.indexOf(button)].dataset.deleteTarget;
    if (StationManagerView.AlertDelete()) {
      StationManagerModel.delete(station);
      StationManagerView.StationTableView();
    } else {
      StationManagerView.StationInputView();
    }
  }
}

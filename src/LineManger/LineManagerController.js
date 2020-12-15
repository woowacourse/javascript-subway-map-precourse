import LineManagerView from './LineManagerView.js';
import LineManagerModel from './LineManagerModel.js';

export default class LineManagerController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      const eventClassName = event.target.className;
      if (eventId === 'line-add-button') {
        this.addButtonClicked();
      }
      if (eventClassName === 'line-delete-button') {
        const button = event.path[0];
        this.deleteButtonClicked(button);
      }
    });
  }

  static addButtonClicked() {
    const line = document.getElementById('line-name-input').value;
    const lineStart = document.getElementById('line-start-station-selector').value;
    const lineEnd = document.getElementById('line-end-station-selector').value;
    const isValid = LineManagerModel.isValidInput(line, lineStart, lineEnd);
    if (isValid !== 1) {
      LineManagerView.alertNameError(isValid);
      LineManagerView.lineInputView();
      return;
    }
    LineManagerModel.add(line, lineStart, lineEnd);
    LineManagerView.lineInputView();
    LineManagerView.lineTableView();
  }

  static deleteButtonClicked(button) {
    const buttons = document.getElementsByClassName('line-delete-button');
    const buttonsArray = Array.from(buttons);
    const line = buttons[buttonsArray.indexOf(button)].dataset.deleteTarget;
    if (!LineManagerView.confirmDelete()) {
      LineManagerView.alertNameError(-8);
      return;
    }
    LineManagerModel.delete(line);
    LineManagerView.lineTableView();
  }
}

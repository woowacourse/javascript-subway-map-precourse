import LineManagerView from './LineManagerView.js';
import LineManagerModel from './LineManagerModel.js';
import StationManagerView from '../StationManger/StationManagerView.js';

export default class LineManagerController {
  static buttonEventController() {
    document.addEventListener('click', (event) => {
      const eventId = event.target.id;
      const eventClassName = event.target.className;
      if (eventId === 'line-add-button') {
        this.addButtonClicked();
      } else if (eventClassName === 'line-delete-button') {
        const button = event.path[0];
        this.deleteButtonClicked(button);
      }
    });
  }

  static addButtonClicked() {
    const line = document.getElementById('line-name-input').value;
    const lineStart = document.getElementById('line-start-station-selector').value;
    const lineEnd = document.getElementById('line-end-station-selector').value;
    if (!LineManagerModel.isValidName(line) || LineManagerModel.isSame(lineStart, lineEnd)) {
      alert('error');
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
    if (LineManagerModel.isInLines(line) && StationManagerView.confirmDelete()) {
      LineManagerModel.delete(line);
      LineManagerView.lineTableView();
    }
  }
}
import LineManagerView from './LineManagerView.js';
import LineManagerModel from './LineManagerModel.js';

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

  }

  static deleteButtonClicked() {
    
  }
}